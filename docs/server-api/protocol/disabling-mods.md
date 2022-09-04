# 🛑 Disabling Mods

The VirtualClient listens for packets on the `"virtualclient:serverapi"` channel as described [here](getting-started/#messaging). The packet for Disabling Mods has the identifier `"disable-mods"`.

## Payload

The payload of the disable-mods packet looks like this:

```json
{
    "clear": false, //Optional - Clears the disabled-mods list
    "blockMods": ["fps"], //Optional - List of mods to block
    "unblockMods": ["zoom"] //Optional - List of mods to un-block
}
```

Lean more about packet and their payloads [here](getting-started/#packet-structure).

## Mod-List

You can basically force-disable any mod you like, although it is only practical for a few mods.

* `"perspective"` - Perspective Mod
* `"fps"` - FPS Widget
* `"armor"` - Armor Status Mod
* `"speed"` - Speed Widget
* `"server"` - Server Widget
* `"memory"` - Memory Usage Widget
* `"coordinates"` - Coordinates Widget
* `"direction"` - Direction Widget
* `"zoom"` - Zoom Mod (Optifine Zoom is not affected by this)
* `"fullbright"` - Fullbright Mod
* `"biome"` - Biome Widget
* `"ping"` - Ping Widget
* `"spotify"` - Spotify Widget
