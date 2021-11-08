const View = (() => {
    const domElements = {
        headers: document.querySelector('.header'),
        table: document.querySelector('table')
    }
   
    const render = (element, temp) => {
        element.innerHTML = temp;
    }

    return {
        domElements,
        render
    }
})();

const Model = (() => {
    const data = [
        {region: 'US', model: 'A', sales: 150},
        {region: 'US', model: 'B', sales: 120},
        {region: 'US', model: 'C', sales: 350},
        {region: 'EU', model: 'A', sales: 200},
        {region: 'EU', model: 'B', sales: 100},
        {region: 'EU', model: 'C', sales: 250},
        {region: 'CA', model: 'A', sales: 200},
        {region: 'CA', model: 'B', sales: 100},
        {region: 'CA', model: 'C', sales: 230},
        {region: 'CA', model: 'D', sales: 400},
    ];

    // let sum1 = 0;
    // let sum2 = 0;
    // let sum3 = 0;
    // let sum = [];
    // for (let i = 0; i < data.length; i++) {
       
    //     if (data[i]["region"] == 'US') {
    //         sum1 += data[i]["sales"];
    //     } else if (data[i]["region"] == 'EU') {
    //         sum2 += data[i]["sales"];
    //     }
    //     sum.push(sum1, sum2);
    //     console.log(sum)
    // }
    
    
    return {
        data
    }
})();

const Controler = ((view, model) => {
    const generateHeaders = () => {
        let temp = "";
        Object.keys(model.data[0]).forEach(ele => {
            temp +=  `<th>${ele}</th>`;
        })
        view.render(view.domElements.headers, temp);
    };

    const generateData = () => {
        for (let ele of model.data) {
            let row = view.domElements.table.insertRow();
            //console.log(model.data[ele]);
            //if (model.data[ele])
            for (key in ele) {
                let cell = row.insertCell();
                let content = document.createTextNode(ele[key]);
                cell.appendChild(content);
            }
        }
        
    }

    const init = () => {
        generateHeaders();
        generateData();
    }

    return { init };
})(View, Model);

Controler.init();