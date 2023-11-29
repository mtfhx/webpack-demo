import * as _ from "lodash";


function component() {
    const element = document.createElement("h1");
    element.innerHTML = _.join(["Hello", "World"], "");
    return element;
}

document.body.appendChild(component());
