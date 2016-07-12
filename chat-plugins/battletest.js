'use strict';

exports.commands = {
	bt: 'battletest',
	battletest: function (target, room, user) {
		if (!this.can('roomvoice', null, room)) return false;
		if (!this.canTalk()) return this.errorReply('You cannot do this while unable to talk.');
		if (!target) return this.parse('/help battletest');
		let targetUser = Users(target);
		if (!targetUser) return this.errorReply("User '" + targetUser + "' is offline. (Check your spelling?)");
		if (!room.users[targetUser.userid]) {
			return this.errorReply(targetUser + " is not in this room. Please make sure they join.");
		}
		this.add(user.name + " has started a battle test on " + targetUser.name + ".");
		targetUser.popup(user.name + " started a battle test for you. Good luck.");
		return this.privateModCommand("(" + user.name + " has started a battletest for " + targetUser.name + ".)");
	},
	battletesthelp: ["/battletest OR /bt [user]: Declares to the chat room that you are starting a battle test for a person."],
	
	btc: 'battletestclear',
	battletestclear: function (target, room, user) {
		if (!this.can('roomvoice', null, room)) return false;
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
		if (!target) return this.parse('/help battletestclear');
		let targetUser = Users(target);
		if (!targetUser) return this.errorReply("User '" + targetUser + "' not found. (Check your spelling?)");
		if (!room.users[targetUser.userid]) {
			return this.errorReply(targetUser + " is not in this room. Please make sure they join.");
		}
		this.add(targetUser.name + " has passed the battle test. (Approved by " + user.name + ".)");
		targetUser.popup("You have passed the battle test in " + room.title + "; congratulations!");
		return this.privateModCommand(
			"(" + targetUser.name + " has passed their battle test. (Approved by " + user.name + ".)"
		);
	},
	battletestclearhelp: ["/battletestclear OR /btc [user]: Declares that a person has completed a battle test."],
	
	btf: "battletestfail",
	battletestfail: function (target, room, user) {
		if (!this.can('roomvoice', null, room)) return false;
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
		if (!target) return this.parse('/help battletestfail');
		let targetUser = Users(target);
		if (!targetUser) return this.errorReply("User '" + targetUser + "' not found. (Check your spelling?)");
		if (!room.users[targetUser.userid]) {
			return this.errorReply(targetUser + " is not in this room. Please make sure they join.");
		}
		this.add(targetUser.name + " has failed the battle test. (Tested by " + user.name + ".)");
		targetUser.popup("You have failed the battle test in " + room.title + ".");
		return this.privateModCommand(
			"(" + targetUser.name + " has failed their battle test. (Tested by " + user.name + ".)"
		);
	},
	battletestfailhelp: ["/battletestfail OR /btf [user]: Declares that a person has failed a battle test."],
	
	// Displays all battle test commands. Extremly helpful, except for the fact that it doesn't work right now.
	btcmds: 'battletestcommands', // changed name to not interfere with '/help battletest'
	battletestcommands: function (target, room, user) {
		this.sendReply("Currently working on other commands for this. Will be completed once this command says something else other than this.");
	},
	
	// Checks all command versions. Not very helpful.
	btv: 'battletestversion',
	battletestversion: function (target, room, user) {
		this.popupReply("All commands are in the Alpha stage. None are completed.");
	},
	
	bte4: 'battletestelite4',
	battletestelite4: function (target, room, user) {
		if (!this.can('declare', null, room)) return false; // Room Owners only can declare this
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
		if (!target) return this.parse('/help battletestelite4');
		let targetUser = Users(target);
		if (!targetUser) return this.errorReply("User '" + targetUser + "' not found. (Check your spelling?)");
		if (!room.users[targetUser.userid]) {
			return this.errorReply(targetUser + " is not in this room. Please make sure they join.");
		}
		this.add(targetUser.name + " passed their battle test and gained E4 status! (Approved by " + user.name + ".)");
		targetUser.popup("You passed your battle test and gained E4 status. Congratulations!");
		return this.privateModCommand(
			"(" + targetUser.name + " passed their battle test and gained E4 status. (Approved by " + user.name + ".)"
		);
	},
	battletestelite4help: ["/battletestelite4 OR /bte4 [user]: Declares that a user passed their battle test and gained E4 status."],
};
