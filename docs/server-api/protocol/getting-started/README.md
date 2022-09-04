# ⭐ Getting Started

### Messaging

The client communicates with the server over one **custom payload channel**. Spigot and some other  server APIs call them **plugin channels**.&#x20;

The message channel you want to listen and send to is: `"virtualclient:serverapi"`

### Packet Structure

VirtualClient Server-API Packets are sent in JSON form.

```json
{
    "identifier": "example",
    "payload": {
        //data
    }
}
```

The identifier declares what the packet is for, and the payload contains the actual data of the packet.

## Communicating with the Client

We have provided helper classes to communicate with the client. You can write these classes yourself if you want to, of course.



[Example Implementation in Spigot](getting-started/implementation-in-spigot)

[Example Implementation in Velocity](getting-started/implementation-in-velocity)

[Example Implementation in BungeeCord](getting-started/implementation-in-bungeecord)



In the next step, you will learn how to detect if a player is using the VirtualClient.
