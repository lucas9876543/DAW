document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addBarButton').addEventListener('click', function() {
        document.getElementById('barForm').style.display = 'block';
    });

    document.getElementById('submitBarButton').addEventListener('click', function() {
        const barName = document.getElementById('barName').value;
        const location = document.getElementById('location').value;
        const rating = document.getElementById('rating').value;
        const tables = document.getElementById('tables').value;
        const priceRange = document.getElementById('priceRange').value;
        const specialities = document.getElementById('specialities').value;
        const website = document.getElementById('website').value;

        // Comprobamos si algún campo está vacío
        if (!barName || !location || !rating || !tables || !priceRange || !specialities || !website) {
            // Mostramos el mensaje de error si algún campo está vacío
            document.getElementById('errorMessage').style.display = 'block';
        } else {
            // Ocultamos el mensaje de error si todos los campos están llenos
            document.getElementById('errorMessage').style.display = 'none';

            // Agregamos la nueva fila a la tabla
            const table = document.getElementById('barsTable').getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();

            const barNameCell = newRow.insertCell(0);
            const locationCell = newRow.insertCell(1);
            const ratingCell = newRow.insertCell(2);
            const tablesCell = newRow.insertCell(3);
            const priceRangeCell = newRow.insertCell(4);
            const specialitiesCell = newRow.insertCell(5);
            const websiteCell = newRow.insertCell(6);

            barNameCell.textContent = barName;
            locationCell.textContent = location;
            ratingCell.textContent = rating;
            tablesCell.textContent = tables;
            priceRangeCell.textContent = priceRange;
            specialitiesCell.textContent = specialities;
            websiteCell.innerHTML = `<a href="${website}" target="_blank" style="color:#00ff9d; text-decoration: none;">Visit Website</a>`;

            // Restablecemos el formulario y lo ocultamos
            document.getElementById('barForm').style.display = 'none';
            document.getElementById('barForm').reset();
        }
    });

    document.getElementById('deleteBarButton').addEventListener('click', function() {
        const table = document.getElementById('barsTable').getElementsByTagName('tbody')[0];
        if (table.rows.length > 0) {
            table.deleteRow(table.rows.length - 1);
        }
    });

    async function fetchBars() {
        try {
            const response = await fetch("http://localhost:3000/bars");
            const bars = await response.json();

            const tableBody = document.getElementById("barsTable").querySelector("tbody");

            bars.forEach(bar => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${bar.name[0]}</td>
                    <td>${bar.location[0]}</td>
                    <td>${bar.rating[0]}</td>
                    <td>${bar.tables[0]}</td>
                    <td>${bar.priceRange[0]}</td>
                    <td>${bar.specialties[0]}</td>
                    <td><a href="${bar.website[0]}" target="_blank" style="color:#00ff9d; text-decoration: none;">Visit Website</a></td>
                `;

                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching bar data:", error);
        }
    }
    

    fetchBars();
});