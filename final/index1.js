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
        {region: 'US', model: 'A', sales: 150},
    ];

    const regions = [];
    for(let ele of data) {
        if (regions.indexOf(ele["region"]) === -1) {
            regions.push(ele["region"]);
        }
    }

    // Get sum based on region
    const getSum = (region) => {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].region === region) {
                sum += data[i].sales;
            }
        }
        return sum;
    }

    return {
        data,
        getSum,
        regions
    }
})();

const Controler = ((view, model) => {
    const generateData = () => {
        let headers = "";
        let temp = "";

        // Generate table headers
        Object.keys(model.data[0]).forEach(ele => {
            headers += `<th>${ele}</th>`
        })

        // Generate table body
        for (let ele of model.regions) {
            temp += `
                    <tr>
                        <td>${ele}</td>
                        <td>sum</td>
                        <td>${model.getSum(ele)}</td>
                    </tr>`
            for (let i = 0; i < model.data.length; i++) {
                if (model.data[i].region === ele) {
                    temp += `
                        <tr>
                            <td>${model.data[i].region}</td>
                            <td>${model.data[i].model}</td>
                            <td>${model.data[i].sales}</td>
                        </tr>`
                } 
            }
        }

        // Combine table header and table body
        let tableData = `
                        <tr>${headers}</tr>  
                        ${temp}
                        `
        view.render(view.domElements.table, tableData);
    }
    // const generateHeaders = () => {
    //     let temp = "";
    //     Object.keys(model.data[0]).forEach(ele => {
    //         temp +=  `<th>${ele}</th>`;
    //     })
    //     view.render(view.domElements.headers, temp);
    // };

    // const generateData = () => {
    //     for (let ele of model.data) {
    //         let row = view.domElements.table.insertRow();
    //         for (key in ele) {
    //             let cell = row.insertCell();
    //             let content = document.createTextNode(ele[key]);
    //             cell.appendChild(content);
    //         }
    //     }   
    // }

    const init = () => {
        //generateHeaders();
        generateData();
    }

    return { init };
})(View, Model);

Controler.init();