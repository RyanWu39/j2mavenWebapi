'use strict';
//請注意瀏覽器前綴標示的實作可能不完整、有些問題或仍然遵守舊版標準，因此不建議在正式版程式碼中使用。與其宣稱支援又有問題，倒不如直接不支援。


var dbSetting = {
	    name: 'IPM_offlineDB',
	    version: 3,
	    instance: undefined,
	    storenames: [{
	        name: 'selectDataSource',
	        setting: { keyPath: "myPK" }
	    }]
	    ,
	    defaultErrorHandler: function (e) {
	        WriteOutText("Error found : " + e);
	    },
	    setDefaultErrorHandler: function (request) {
	        if ('onerror' in request) {
	            request.onerror = db.defaultErrorHandler;
	        }
	        if ('onblocked' in request) {
	            request.onblocked = db.defaultErrorHandler;
	        }
	    }

	};

var list = [
  { myPK: "777", text: "S1", value:"1" },
  { myPK: "9527", text: "S2", value:"2" }
];
var dd = indexedDbHelper(dbSetting);
//dd.deleteDb();
dd.connectDb(function(db){
	var transaction = db.transaction(["selectDataSource"], "readwrite");

	var objectStore = transaction.objectStore("selectDataSource");
	for (var i in list) {
	   var request = objectStore.add(list[i]);
	  request.onsuccess = function(event) {
	    
	  };
	}

	// Do something when all the data is added to the database.
	transaction.oncomplete = function(event) {
	  console.log("transaction: All done!");
	  db.close();
	};
	transaction.onerror = function(event) {
	  console.log("transaction error: "+transaction.error);
	};
	

});

