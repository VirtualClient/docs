# Implementation in Spigot

This example uses [**ProtocolLib**](https://www.spigotmc.org/resources/protocollib.1997/), but you can adapt it to NMS or other protocol libraries.

This class can be used to send packets to players and read packets from buffers.

```java
import com.google.common.base.Charsets;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.bukkit.entity.Player;
import com.comphenix.protocol.PacketType;
import com.comphenix.protocol.ProtocolLibrary;
import com.comphenix.protocol.events.PacketContainer;
import com.comphenix.protocol.utility.MinecraftReflection;
import com.comphenix.protocol.wrappers.MinecraftKey;
import java.lang.reflect.InvocationTargetException;

public class VirtualClientServerApi {

    public static void sendPayload(Player player, String identifier, JsonObject payload) {
        ByteBuf buffer = Unpooled.buffer();

        JsonObject send = new JsonObject();
        send.addProperty("identifier", identifier);
        send.add("payload", payload);

        writeString(send.toString(), buffer);
        
        PacketContainer packetContainer = new PacketContainer(PacketType.Play.Server.CUSTOM_PAYLOAD);
        packetContainer.getMinecraftKeys().write(0, new MinecraftKey("virtualclient", "serverapi"));

        if (MinecraftReflection.is(MinecraftReflection.getPacketDataSerializerClass(), buffer)) {
            packetContainer.getModifier().withType(ByteBuf.class).write(0, buffer);
        } else {
            Object serializer = MinecraftReflection.getPacketDataSerializer(buffer);
            packetContainer.getModifier().withType(ByteBuf.class).write(0, serializer);
        }

        try {
            ProtocolLibrary.getProtocolManager().sendServerPacket(player, packetContainer);
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }
    
    public static ClientPacket readPacket(ByteBuf buf) {
        //Spigot has a really old gson lib in some versions so we gotta use this :/
        JsonObject object = new JsonParser().parse(readString(buf)).getAsJsonObject();
        return new ClientPacket(object.get("identifier").getAsString(), object.get("payload").getAsJsonObject());
    }
    
    public static void writeString(String s, ByteBuf buf) {
        if (s.length() > 32767) {
            throw new RuntimeException(String.format("Cannot send string longer than Short.MAX_VALUE (got %s characters)", s.length()));
        } else {
            byte[] b = s.getBytes(Charsets.UTF_8);
            writeVarInt(b.length, buf);
            buf.writeBytes(b);
        }
    }


    public static String readString(ByteBuf buf) {
        return readString(buf, 32767);
    }

    public static String readString(ByteBuf buf, int maxLen) {
        int len = readVarInt(buf);
        if (len > maxLen * 4) {
            throw new RuntimeException(String.format("Cannot receive string longer than %d (got %d bytes)", maxLen * 4, len));
        } else {
            byte[] b = new byte[len];
            buf.readBytes(b);
            String s = new String(b, Charsets.UTF_8);
            if (s.length() > maxLen) {
                throw new RuntimeException(String.format("Cannot receive string longer than %d (got %d characters)", maxLen, s.length()));
            } else {
                return s;
            }
        }
    }

    public static int readVarInt(ByteBuf input) {
        return readVarInt(input, 5);
    }

    public static int readVarInt(ByteBuf input, int maxBytes) {
        int out = 0;
        int bytes = 0;

        byte in;
        do {
            in = input.readByte();
            out |= (in & 127) << bytes++ * 7;
            if (bytes > maxBytes) {
                throw new RuntimeException("VarInt too big");
            }
        } while((in & 128) == 128);

        return out;
    }

    public static void writeVarInt(int value, ByteBuf output) {
        do {
            int part = value & 127;
            value >>>= 7;
            if (value != 0) {
                part |= 128;
            }

            output.writeByte(part);
        } while(value != 0);

    }
    

    //You can convert this to a record if you're on Java >= 16
    public static class ClientPacket {
        private final String identifier;
        private final JsonObject payload;
        
        public ClientPacket(String identifier, JsonObject payload) {
            this.identifier = identifier;
            this.payload = payload;
        }
        
        public String getIdentifier() {
            return identifier;
        }
        
        public JsonObject getPayload() {
            return payload;
        }
    }

}
```

Use this to listen for incoming packets. You will need to class above to read the packets.

```java
@Override
public void onEnable() {
    getServer().getMessenger().registerIncomingPluginChannel(this, "virtualclient:serverapi", this);
}

@Override
public void onPluginMessageReceived(String channel, Player player, byte[] message) {
    if (!channel.equals("virtualclient:serverapi")) {
        return;
    }
    
    //Convert the array to a netty buffer
    ByteBuf buf = Unpooled.wrappedBuffer(message);
    VirtualClientServerApi.ClientPacket packet = VirtualClientServerApi.readPacket(buf);

    //Now you have the packet information and can read the identifier and payload.

}
```
