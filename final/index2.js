const View = (() => {
    const domElements = {
        regionFilter: document.querySelector('#regionFilter'),
        modelFilter: document.querySelector('#modelFilter'),
        headers: document.querySelector('.header'),
        //table: document.querySelector('.data')
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

    // Get all the regions
    const regions = ['all'];
    for(let ele of data) {
        if (regions.indexOf(ele["region"]) === -1) {
            regions.push(ele["region"]);
        }
    }

    // Get all the models
    const models = ['all'];
    for(let ele of data) {
        if (models.indexOf(ele["model"]) === -1) {
            models.push(ele["model"]);
        }
    }

    return {
        data,
        regions,
        models,
    }
})();

const Controler = ((view, model) => {
    const createKeyList = () => {
        let temp = '';
        model.regions.forEach(ele => {
            temp += `<option value="${ele}">${ele}</option>`;
        });
        view.render(regionFilter, temp);
    }

    const createValueList = () => {
        let temp = '';
        model.models.forEach(ele => {
            temp += `<option value="${ele}">${ele}</option>`;
        });
        view.render(modelFilter, temp);
    }

    // const generateHeaders = () => {
    //     let temp = "";
    //     Object.keys(model.data[0]).forEach(ele => {
    //         temp +=  `<th>${ele}</th>`;
    //     })
    //     view.render(view.domElements.headers, temp);
    // };

    const generateData = (...data) => {
        let headers = "";
        let temp = "";

        // Generate table headers
        Object.keys(model.data[0]).forEach(ele => {
            headers += `<th>${ele}</th>`
        })

        // Generate table body
        data.forEach(ele => {
            temp +=  `      
                    <tr>
                        <td>${ele.region}</td>
                        <td>${ele.model}</td>
                        <td>${ele.sales}</td>
                    </tr>`;
        })
        
        // Combine table headers and table body
        let tableData = `
                        <tr>
                            ${headers}
                        </tr>  
                        ${temp}
                        `
        view.render(view.domElements.table, tableData);
    }

    // const generateData = () => {
    //     for (let ele of model.data) {
    //         let row = view.domElements.table.insertRow();
    //         //console.log(model.data[ele]);
    //         //if (model.data[ele])
    //         for (key in ele) {
    //             let cell = row.insertCell();
    //             let content = document.createTextNode(ele[key]);
    //             cell.appendChild(content);
    //         }
    //     }  
    // }

    const setUpEvent = () => {
        view.domElements.regionFilter.addEventListener('change', event => {
            if (event.target.value === 'all' && view.domElements.modelFilter.value === 'all') {
                let filteredData = model.data;
                generateData(...filteredData);
            } else if (event.target.value !== 'all' && view.domElements.modelFilter.value === 'all') {
                let filteredData = model.data.filter((ele) => {
                    return ele.region === event.target.value;
                })
                generateData(...filteredData);
            } else if (event.target.value === 'all' && view.domElements.modelFilter.value !== 'all') {
                let filteredData = model.data.filter((ele) => {
                    return ele.model === view.domElements.modelFilter.value;
                })
                generateData(...filteredData);
            } else {
                let filteredData = model.data.filter((ele) => {
                    return ele.region === event.target.value && ele.model === view.domElements.modelFilter.value;
                })
                generateData(...filteredData);
            }
        });

        view.domElements.modelFilter.addEventListener('change', event => {
            if (view.domElements.regionFilter.value === 'all' && event.target.value === 'all') {
                let filteredData = model.data;
                generateData(...filteredData);
            } else if (view.domElements.regionFilter.value !== 'all' && event.target.value === 'all') {
                let filteredData = model.data.filter((ele) => {
                    return ele.region === view.domElements.regionFilter.value;
                })
                generateData(...filteredData);
            } else if (view.domElements.regionFilter.value === 'all' && event.target.value !== 'all') {
                let filteredData = model.data.filter((ele) => {
                    return ele.model === event.target.value;
                })
                generateData(...filteredData);
            } else {
                let filteredData = model.data.filter((ele) => {
                    return ele.region === view.domElements.regionFilter.value && ele.model === event.target.value;
                })
                generateData(...filteredData);
            }
        });
    }

    const init = () => {
        createKeyList();
        createValueList();
        setUpEvent();
        //generateHeaders();
        generateData();
        window.onload = generateData(...model.data);
    }
    return { init };
})(View, Model);

Controler.init();