# 🧑 VirtualClient players

The VirtualClient sends a packet on the `"virtualclient:serverapi"` channel as described [here ](getting-started/#messaging)after the Game Join packet has been sent.  The packet has the identifier `"init"`



Every Minecraft servers send this packet after a player enters the server. And when using a proxy like Velocity or BungeeCord every time you switch to another server the client will receive this packet again. &#x20;

## Payload

The payload of this packet looks like this:

```json
{
    "client-version": "0.0.10"
}
```

Lean more about packet and their payloads [here](getting-started/#packet-structure).



You can look at the examples at the "Getting Started" pages for reading packets

## Processing the data

After receiving **any** VirtualClient packet, you basically already know that the player is using the VirtualClient.&#x20;



If you want to receive the client version too, you can use this code:

```java
ClientPacket packet = VirtualClientServerApi.readPacket(buf);
if(!packet.getIdentifier().equals("init"))
    return;
String version = packet.getPayload().get("client-version").getAsString();

```

Keep in mind that the client version is not directly bound to any format. We will try to stick to the format of primary-release.secondary-release.patch-release + SUFFIX(optional) though.

Examples: "0.0.10", "0.0.10 Partner BETA"
