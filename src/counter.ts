import { db, schema } from "./db"

export function setupCounter(element: HTMLButtonElement) {
	let counter = 0
	const setCounter = async (count: number) => {
		counter = count
		await db
			.insert(schema.count).values({
				name: element.id,
				count,
			})
			.onConflictDoUpdate({
				target: schema.count.name,
				set: { count },
			})
		element.innerHTML = `count is ${counter}`
	}
	element.addEventListener('click', () => setCounter(counter + 1))
	setCounter(0)
}
