document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('validationForm');
    const fields = {
        fullName: /^[А-ЯІЇЄҐ][а-яіїєґ']+\s[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/,
        variant: /^\d{2}$/,
        group: /^[А-ЯІЇЄҐ]{2}-\d{2}$/,
        phone: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
        idCard: /^[А-ЯІЇЄҐ]{2}\s№\d{6}$/
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Заборона стандартної відправки форми
        let allValid = true;
        let formData = '';

        Object.keys(fields).forEach(id => {
            document.getElementById(id).classList.remove('invalid');
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
            //перевірка коректності даних та їх вивід у вікні
            formData += '<h1>Введені дані:</h1>';
            formData += `<p><strong>ПІБ:</strong> ${document.getElementById('fullName').value}</p>`;
            formData += `<p><strong>Варіант:</strong> ${document.getElementById('variant').value}</p>`;
            formData += `<p><strong>Група:</strong> ${document.getElementById('group').value}</p>`;
            formData += `<p><strong>Телефон:</strong> ${document.getElementById('phone').value}</p>`;
            formData += `<p><strong>ID-card:</strong> ${document.getElementById('idCard').value}</p>`;

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

    // Тут я вводив свій номер варіанту( а саме 16 )
    const myVariant = 16;

    let cellCounter = 1;
    for (let i = 0; i < 6; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 6; j++) {
            const cell = row.insertCell();
            cell.textContent = cellCounter;

            if (cellCounter === myVariant) {
                cell.addEventListener('mouseover', () => {
                    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                    cell.style.backgroundColor = randomColor;
                });

                cell.addEventListener('mouseout', () => {
                    cell.style.backgroundColor = '';
                });

                cell.addEventListener('click', () => {
                    cell.style.backgroundColor = colorPicker.value;
                });

                cell.addEventListener('dblclick', () => {
                    const parentRow = cell.parentElement;
                    const rowColor = colorPicker.value;
                    for(const childCell of parentRow.children) {
                        childCell.style.backgroundColor = rowColor;
                    }
                });
            }
            cellCounter++;
        }
    }
    tableContainer.appendChild(table);
});