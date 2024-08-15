import { pg } from "./db"

export function setupDBElement(element: HTMLDivElement) {
	const refreshEl = document.createElement("button")
	refreshEl.textContent = "Refresh"
	const countTableEl = document.createElement("div")
	countTableEl.classList.add("table")
	const headerEl = document.createElement("div")
	const bodyEl = document.createElement("div")

	let countTable: {
		fields: { name: string }[],
		rows: { [key: string]: any }[]
	} = {
		fields: [],
		rows: [],
	}

	const refresh = async () => {
		countTable = await pg.query("select * from count")
	}

	const updateTable = (tableEl: HTMLDivElement) => {
		headerEl.innerHTML = ""
		bodyEl.innerHTML = ""

		tableEl.style.gridTemplateColumns = `repeat(${countTable.fields.length}, 1fr)`

		headerEl.classList.add("header")
		headerEl.style.display = "grid"
		headerEl.style.gridTemplateColumns = "subgrid"
		headerEl.style.gridColumn = `span ${countTable.fields.length}`

		bodyEl.classList.add("body")
		bodyEl.style.display = "grid"
		bodyEl.style.gridTemplateColumns = `subgrid`
		bodyEl.style.gridColumn = `span ${countTable.fields.length}`

		for (const field of countTable.fields) {
			const fieldEl = document.createElement("div")
			const fieldTextEl = document.createElement("strong")
			fieldTextEl.textContent = field.name
			fieldEl.appendChild(fieldTextEl)
			headerEl.appendChild(fieldEl)
		}
		for (const row of countTable.rows) {
			const rowEl = document.createElement("div")
			rowEl.classList.add("row")
			rowEl.style.display = "grid"
			rowEl.style.gridTemplateColumns = "subgrid"
			rowEl.style.gridColumn = `span ${countTable.fields.length}`
			for (const field of countTable.fields) {
				const dataEl = document.createElement("div")
				dataEl.textContent = row[field.name]
				rowEl.appendChild(dataEl)
			}
			bodyEl.appendChild(rowEl)
		}

		tableEl.appendChild(headerEl)
		tableEl.appendChild(bodyEl)
	}

	refreshEl.addEventListener("click", async () => {
		await refresh()
		updateTable(countTableEl)
	})

	element.appendChild(refreshEl)
	element.appendChild(countTableEl)

	setTimeout(async () => {
		await refresh()
		updateTable(countTableEl)
	})
}
