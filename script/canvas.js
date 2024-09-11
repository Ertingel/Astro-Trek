class Canvas {
	constructor(
		element,
		clearColor = "#888888",
		camera = {
			x: 0.0,
			y: 0.0,
			width: 1.0,
			height: 1.0,
		}
	) {
		if (typeof element == "string")
			element = document.getElementById(element)

		this.element = element
		this.context = element.getContext("2d")
		this.clearColor = clearColor
		this.camera = camera
		this.children = []

		this.time = 0.0
		this.delta = 0.0

		this.resizeObserver = new ResizeObserver(e => {
			for (const entry of e) {
				entry.target.width = entry.contentRect.width
				entry.target.height = entry.contentRect.height
			}
		}).observe(element)
	}

	clear() {
		this.context.reset()
		this.context.fillStyle = this.clearColor
		this.context.fillRect(0, 0, this.element.width, this.element.height)

		const zoom = Math.min(
			this.element.width / this.camera.width / 2.0,
			this.element.height / this.camera.height / 2.0
		)
		this.context.translate(
			this.element.width / 2.0,
			this.element.height / 2.0
		)
		this.context.scale(zoom, zoom)
		this.context.translate(-this.camera.x, this.camera.y)
	}

	animation(animationFunction, animate = true) {
		this.animate = animate
		this.animationFunction = animationFunction

		if (animate) play()
		else redraw()
	}

	play() {
		this.animate = true
		var laststamp = null

		const callback = () => {
			const timestamp = new Date()
			if (laststamp === null) laststamp = timestamp

			let delta = (timestamp - laststamp) / 1000.0
			if (delta <= 0.0) delta = 0.0001

			this.step(delta)

			if (this.animate) requestAnimationFrame(callback)

			laststamp = timestamp
		}

		callback()
	}

	pause() {
		this.animate = false
	}

	step(delta) {
		this.time += delta
		this.delta = delta

		this.update()
		this.redraw()
	}

	update() {
		this.children.forEach(object => object.updateAll(this))
	}

	redraw() {
		this.clear()
		this.children.forEach(object => object.drawAll(this))
		if (this.animationFunction) this.animationFunction(this, this.context)
	}

	addChild(child) {
		child.removeParent()
		this.children.push(child)
		child.parent = this
	}

	removeChild(child) {
		this.children = this.children.filter(child => child !== child)
		child.parent = null
	}
}

class Object {
	constructor(data = { x: 0.0, y: 0.0, rotation: 0.0, parent: null }) {
		this.x = data?.x || 0.0
		this.y = data?.y || 0.0
		this.rotation = data?.rotation || 0.0
		this.propagateRotation = data?.propagateRotation || 0.0

		this.children = []
		this.setParent(data?.parent)
	}

	addChild(child) {
		child.removeParent()
		this.children.push(child)
		child.parent = this
	}

	removeChild(child) {
		this.children = this.children.filter(child => child !== child)
		child.parent = null
	}

	setParent(parent) {
		if (parent) parent.addChild(this)
		else this.parent = null
	}

	removeParent() {
		if (this.parent) this.parent.removeChild(this)
		else this.parent = null
	}

	updateAll(canvas) {
		this.update(canvas)
		this.children.forEach(child => child.updateAll(canvas))
	}

	update(canvas) {}

	drawAll(canvas) {
		canvas.context.save()

		canvas.context.save()
		if (this.propagateRotation) canvas.context.rotate(this.rotation)
		canvas.context.translate(this.x, -this.y)
		this.children.forEach(child => child.drawAll(canvas))
		canvas.context.restore()

		canvas.context.rotate(this.rotation)
		canvas.context.translate(this.x, -this.y)

		this.draw(canvas)

		canvas.context.restore()
	}

	draw(canvas) {}
}
