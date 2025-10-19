document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('validationForm');
    const fields = {
        fullName: /^[А-ЯІЇЄҐ][а-яіїєґ']+\s[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/,
        idCard: /^[А-ЯІЇЄҐ]{2}\s№\d{6}$/,
        faculty: /^[А-ЯІЇЄҐ]{4}$/,
        birthDate: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(19\d\d|20\d\d)$/,
        address: /^м\.\s[А-ЯІЇЄҐ][а-яіїєґ']+$/
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let allValid = true;
        let formData = '';

        Object.keys(fields).forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.classList.remove('invalid');
            }
        });

        for (const id in fields) {
            const input = document.getElementById(id);
            const regex = fields[id];

            if (!regex.test(input.value)) {
                input.classList.add('invalid');
                allValid = false;
            }
        }

        if (allValid) {
            formData += '<h1>Введені дані:</h1>';
            formData += `<p><strong>ПІБ:</strong> ${document.getElementById('fullName').value}</p>`;
            formData += `<p><strong>ID-card:</strong> ${document.getElementById('idCard').value}</p>`;
            formData += `<p><strong>Факультет:</strong> ${document.getElementById('faculty').value}</p>`;
            formData += `<p><strong>Дата народження:</strong> ${document.getElementById('birthDate').value}</p>`;
            formData += `<p><strong>Адреса:</strong> ${document.getElementById('address').value}</p>`;

            const newWindow = window.open('', 'form_data', 'width=400,height=400');
            newWindow.document.write(formData);
        } else {
            alert('Будь ласка, виправте помилки у виділених полях.');
        }
    });


    const tableContainer = document.getElementById('tableContainer');
    const colorPicker = document.getElementById('colorPicker');
    const table = document.createElement('table');
    table.id = 'interactiveTable';

    const myVariant = 4;
    const tableSize = 6;

    let cellCounter = 1;
    for (let i = 0; i < tableSize; i++) {
        const row = table.insertRow();
        for (let j = 0; j < tableSize; j++) {
            const cell = row.insertCell();
            cell.textContent = cellCounter;

            if (cellCounter === myVariant) {

                cell.addEventListener('mouseover', () => {
                    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                    cell.style.backgroundColor = randomColor;
                });

                cell.addEventListener('mouseout', () => {
                    cell.style.backgroundColor = '';
                });

                cell.addEventListener('click', () => {
                    cell.style.backgroundColor = colorPicker.value;
                });

                cell.addEventListener('dblclick', () => {
                    const chosenColor = colorPicker.value;
                    const allRows = table.rows;

                    for (let rowIndex = 0; rowIndex < tableSize; rowIndex++) {
                        const colIndex = tableSize - 1 - rowIndex;
                        const diagonalCell = allRows[rowIndex].cells[colIndex];
                        diagonalCell.style.backgroundColor = chosenColor;
                    }
                });
            }
            cellCounter++;
        }
    }
    tableContainer.appendChild(table);
});