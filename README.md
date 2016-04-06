# Dataview-type component in React for MK

Files of interest:
[apimoon.json](apimoon.json)               MeteorKitchen Application JSON for Apimoon 
#Files that are needed to be generated  
Examples for two collections apimoon and todos.

1. [files/columns-apimoon.jsx](files/columns-apimoon.jsx)  "configuration" file for data_view.jsx
2. [files/schema-apimoon.js](files/schema-apimoon.js)    tcomb schema used in data_view.jsx
3. [files/columns-todo.jsx](files/columns-todo.jsx)     "configuration" file for data_view.jsx
4. [files/schema-todo.js](files/schema-todo.js)       tcomb schema used in data_view.jsx

# Other used files
1. [files/griddle.css](files/griddle.css)          Modified griddle css to allow table-hover and table-striped to work, used in data_view.jsx
2. [files/client.js](files/client.js)            Shows an example how to import collection js usable in client
3. [files/server.js](files/server.js)            Contains startup insert code for Apimoon collection. Uses *-code.js files.

Files from files are copied to meteor app dir based on configuration in ../apimoon.json

# Meteor app files generated by MeteorKitchen worth looking
1. [apimoon/client/pages/apimoons_page/apimoons_page.jsx](apimoon/client/pages/apimoons_page/apimoons_page.jsx)
2. [apimoon/client/pages/pagetodos/pagetodos.jsx](apimoon/client/pages/pagetodos/pagetodos.jsx)

Note that actually the apimoons_page.jsx and pagetodos.jsx contains all the functionality. That is pages in details/edit/insert are not curretly used at all.



Below is readme for the actual APimoon app.
# apimoon
API gateway/proxy. Register your API endpoint, configure access and publish it through the proxy. Comes with mock and load-balancing. 

- Eats JSON delivered different ways:
- HTTP
- DDP
- Sandbox in the middle where with javascript can do mappings from format x to format
- Provides JSON through HTTP
- Also implements GraphQL Server / Client


# Read the highlevel doc
 https://docs.google.com/document/d/141UD-nxg2nxL-dxCG0ijBgZZAyBXhQw5vrSPhPz5o1E/pub
 (coming to MD format soon)
