# 🗨️ Info Indicators

The VirtualClient listens for packets on the `"virtualclient:serverapi"` channel as described [here](getting-started/#messaging). The packet for the Indicators has the identifier `"indicators"`.

# Payload

The payload looks something like this. The documentation below will show what they do and how to use them exactly.

```json
{
    //The array of indicators to display. If this is empty it will remove all indicators. 
    "indicators": [
        {

            //Optional array of icons.
            "icons": [
                //Displaying an item
                {
                    "type": "item",
                    "item": "minecraft:stone"
                },
                //Displaying an image from url
                {
                    "type": "url",
                    "url": "https://your-image.url"
                },
                //Displaying a raw color
                {
                    "type": "color",
                    //Color packed as a single rgb int
                    "color": -65536
                }
            ],

            //The title is a bit more complex. It supports raw text or json message components provided as a json element
            //Examples:
            //"title": "My Title"
            //"title": ["",{"text":"Coins: "},{"text":"500","color":"yellow"}]
            "title": "My Title"
        }
    ]
}
```

# Examples

Lets implement the following example:

![](/img/info-indicators.png)


You can create some helper methods to easily create indicators. In this example we will use basic Gson JsonObjects and Kyori Adventure. You can of course use other component libraries(or supply basic text) and other json serialization libraries/implement pojo classes for the indicators and serialize them with gson.

Here we have some methods for the icons:
```java
    public JsonObject getUrlIcon(String icon) {
        JsonObject iconObject = new JsonObject();
        iconObject.addProperty("type", "url");
        iconObject.addProperty("url", icon);
        return iconObject;
    }

    public JsonObject getItemIcon(Material material) {
        JsonObject iconObject = new JsonObject();
        iconObject.addProperty("type", "item");
        iconObject.addProperty("item", material.getKey().toString());
        return iconObject;
    }

    public JsonObject getColorIcon(Color color) {
        JsonObject iconObject = new JsonObject();
        iconObject.addProperty("type", "color");
        iconObject.addProperty("color", color.getRGB());
        return iconObject;
    }
```

And now a helper for the indicators itself.

```java
    public JsonObject createIndicator(List<JsonObject> iconsList, Component title) {
        JsonObject object = new JsonObject();
        JsonArray icons = new JsonArray();
        for (JsonObject jsonObject : iconsList) {
            icons.add(jsonObject);
        }
        object.add("icons", icons);
        object.addProperty("title", GsonComponentSerializer.gson().serialize(title));
        return object;
    }
```

And now lets just create our indicators and send the payload to the player
```java
    JsonObject indicatorPayload = new JsonObject();
    JsonArray indicators = new JsonArray();
    indicatorPayload.add("indicators", indicators);

    indicators.add(createIndicator(List.of(getItemIcon(Material.CLOCK)), Component.text("16h 10m", NamedTextColor.GRAY)));
    indicators.add(createIndicator(List.of(getItemIcon(Material.RAW_GOLD)), Component.text("500", NamedTextColor.GOLD)
            .append(Component.space())
            .append(Component.text("Coins", NamedTextColor.GRAY))));
    indicators.add(createIndicator(List.of(getColorIcon(new Color(0xffff55))), Component.text("Your Team", NamedTextColor.GRAY)));


    VirtualClientServerApi.sendPayload(event.getPlayer(), "indicators", indicatorPayload);
```
