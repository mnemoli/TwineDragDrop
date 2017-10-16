// Set up namespace
setup.dragDrop = {};

// Must be called by ondragstart.
// Your inventory item must have a unique id on its wrapper element.
// For example: <div id="inv-myItem" draggable="true" ondragstart="dragInv(event)">My Item</div>
// See README for more information about how to get the above div structure.

setup.dragDrop.dragInv = function(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
};

// Add to global namespace. You can unglobal this if it causes an issue for you.
window.dragInv = setup.dragDrop.dragInv;

setup.dragDrop.allowDrop = function(ev) {
	ev.preventDefault();
};

// On drop, retrieve the unique ID of the inventory item we just used on the target, and process what action to perform
// By default, any printing/display will be done just after the name of the target
// e.g. "This is the Target" > "This is the Target and here is some text printed by the interaction"
// but you can override that by using <<replace>> macros etc to target another specific place
setup.dragDrop.dropInv = function(ev) {
	ev.preventDefault();
	var invItemID = ev.dataTransfer.getData("text");
	var $targetWrapper = $(ev.target).parent();
	var actionToPerform = $targetWrapper.data("actions").get(invItemID);
	if(actionToPerform === undefined) {
		actionToPerform = $targetWrapper.data("actions").get("default");
	}
	$targetWrapper.wiki(actionToPerform);
};

window.allowDrop = setup.dragDrop.allowDrop;
window.dropInv = setup.dragDrop.dropInv;

// Add the macro itself.
// Usage:
// <<droppable "TargetText">>
//    <<item "InvItem">>
//      <<goto "SomePage">>
//    <<default>>
//      Some text here
// <</droppable>>
// See example Twine game/README in GitHub for more info

Macro.add('droppable', {
	tags: ["item", "default"],
	handler: function() {
		var dat = new Map();
		
		for (var i = 1; i < this.payload.length; ++i) {
			var key = this.payload[i].name === "default" ? "default" : "inv-" + this.payload[i].args[0];
			dat.set(key, this.payload[i].contents);
		}
		
		var $wrapper = $('<span class="droppable" ondrop="dropInv(event)" ondragover="allowDrop(event)"></span>');
		var $itemTextWrapper = $('<span class="droppableText"/>');
		$wrapper.data("actions", dat);
		$wrapper.html($itemTextWrapper.wiki(this.args[0]));
		$wrapper.appendTo(this.output);
	}
});
