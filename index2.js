const View = (() => {
    const domElements = {
        keys: document.querySelector('#keys'),
        values: document.querySelector('#values'),
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

    const region = ['US', 'EU', 'CA'];
    const model = ['A', 'B', 'C', 'D'];

    return {
        data,
        region,
        model
    }
})();

const Controler = ((view, model) => {
    const createKeyList = () => {
        let temp = '';
        model.region.forEach(key => {
            temp += `<option value="${key}">${key}</option>`;
        });
        view.render(keys, temp);
    }
    const createValueList = () => {
        let temp = '';
        model.model.forEach(value => {
            temp += `<option value="${value}">${value}</option>`;
        });
        view.render(values, temp);
    }

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
    // const setUpEvent = () => {
    //     view.domElements.keys.addEventListener('change', event => {
    //         view.domElements.values.value = event.target.value;
    //     });
    //     view.domElements.values.addEventListener('change', event => {
    //         view.domElements.keys.value = event.target.value;
    //     });
    // }

    const init = () => {
        createKeyList();
        createValueList();
        setUpEvent();
        generateHeaders();
        generateData();
    }
    return { init };
})(View, Model);

Controler.init();