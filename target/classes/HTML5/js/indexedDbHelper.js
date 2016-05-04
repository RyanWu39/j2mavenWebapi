var indexedDbHelper = function(setting)
{
	if (!window.indexedDB) {
	   window.alert("Your browser doesn't support a stable version of IndexedDB.")
	}

	return {
    nameOfDBStore: function () { alert("Indexed DB Store name : " + setting.name); },
    connectDb: function (callback) {
        var openRequest = indexedDB.open(setting.name, setting.version);

        openRequest.onupgradeneeded = function (e) {
            var newVersion = e.target.result;
            for (var i = 0; i <=setting.storenames.length - 1 ; i++) {
            	var store = setting.storenames[i]
            	if (!newVersion.objectStoreNames.contains(store.name)) {
                	newVersion.createObjectStore(store.name,store.setting);
            	}
            }
        };

        openRequest.onerror = openRequest.onblocked = 'Error'; //resultText;

        openRequest.onsuccess = function (e) {
            //WriteOutText("Database open");
            setting.instance = e.target.result;
            callback(setting.instance);
        };

    },
    deleteDb: function (dbName) {
        	if(setting.instance)
            	setting.instance.close();
            if(!dbName)
            	dbName=setting.name;
            var deleteRequest = indexedDB.deleteDatabase(dbName)

            deleteRequest.onblocked = function () {
                console.log(dbName+" Delete blocked.");
            }

            deleteRequest.onerror =function () {
                	var error = "Error deleting the DB:"+dbName;
                    console.log(error);
                    alert(error);
            };
            deleteRequest.onsuccess = function () {
                console.log(dbName+" Deleted OK.");
            };

    },
    getDbInstance:function(){
    	return setting.instance;
    }
  };
}