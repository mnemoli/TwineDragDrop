# TwineDragDrop
Add to ChapelR's inventory system for an inventory that can be dragged and dropped onto passage text to interact

# How to use
Get the simple inventory https://github.com/ChapelR/custom-macros-for-sugarcube-2#simple-inventory (or prepare to adapt the code onto your own inventory system)

Copy simple inventory code, and the code from this repo, to your SugarCube story by clicking your story name, then "Edit Story Javascript".

You must also ensure that each of your inventory item wrappers (div, span or whatever) has a unique ID starting with "inv-" that can identify the item that has been used. For example:
```
<div id="inv-egg" class="invItem" draggable="true" ondragstart="dragInv(event)">Egg</div>
<div id="inv-corn" class="invItem" draggable="true" ondragstart="dragInv(event)">Corn</div>
```

You then define interactions in your \<\<droppable\>\> macro, for example:
```
<<droppable "Chicken">>\
  <<item "egg">>\
    <<goto "Egg">>\
  <<item "corn">>\
    <<goto "Corn">>\
  <<default>>\
    The chicken clucks.
<</droppable>>
```

# How to style
To style the targets/droppables (i.e. the things you can use your inventory items on), use the class .droppableText.
