import {
    Meteor
}
from 'meteor/meteor';
import {
    Apiclients
}
from '/lib/collections/apiclients.js';


// callRest call HTTP endpoint from server
export const callRest = new ValidatedMethod({
    name: 'apiclients.callRest',
    validate: () => {
        console.log("callRest validate");
    },
    run(
        rowData
    ) {
        this.unblock();
        var update = function(lastResult) {
             let id = rowData._id;
            let values = {};
            values.lastResult = JSON.stringify(data);
            Apiclients.update({
                _id: id
            }, {
                $set: values
            })
        };
        update( { status: "callRest running soon" });
        console.log("callRest running "); //  rowData=", rowData);

        if (!this.isSimulation) {
            if (!rowData.userAgent) {
                rowData.userAgent = "Apimoon Test App";
            }
            var options = {
                headers: {
                    "User-Agent": rowData.userAgent
                }
            };
            try {
            var data = HTTP.call(rowData.method, rowData.url, options);
            update( data );
            } catch(err) {
                console.log(err);
                update( { result: err});
            }
        }

        console.log("callRest finished..")
        return "ok";
    }

});