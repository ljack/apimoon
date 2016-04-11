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
        console.log("validate");
    },
    run(
        rowData
    ) {
        this.unblock();
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
            var data = HTTP.call(rowData.method, rowData.url, options);
            let id = rowData._id;
            let values = {};
            values.lastResult = JSON.stringify(data);
            Apiclients.update({
                _id: id
            }, {
                $set: values
            })
        }

        console.log("callRest finished..")
        return "ok";
    }

});