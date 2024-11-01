/**
 * The `KeplerianOrbit` class encapsulate the data of a _[Keplerian orbit](https://en.wikipedia.org/wiki/Kepler_orbit)_.
 *
 * | Name                                                                                             | Notation  | Description                                                                                              |
 * |-------------------------------------------------------------------------------------------------:|:---------:|:---------------------------------------------------------------------------------------------------------|
 * | [Semimajor axis](https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes)                   | _a_       | The half distance between the apoapsis and periapsis.                                                    |
 * | [Semiminor axis](https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes)                   | _b_       | The line segment that is at right angles with the semi-major axis.                                       |
 * | [Focal point](https://en.wikipedia.org/wiki/Ellipse#Definition_as_locus_of_points)               | _c_       | The distance between the elipse center and its focal point.                                              |
 * | [Eccentricity](https://en.wikipedia.org/wiki/Orbital_eccentricity)                               | _e_       | The shape of the ellipse.                                                                                |
 * | [Argument of periapsis](https://en.wikipedia.org/wiki/Argument_of_periapsis)                     | _ω_       | The orientation of the ellipse in the orbital plane.                                                     |
 * | [Inclination](https://en.wikipedia.org/wiki/Orbital_inclination)                                 | _i_       | The vertical tilt of the ellipse with respect to the reference plane.                                    |
 * | [Longitude of the ascending node](https://en.wikipedia.org/wiki/Longitude_of_the_ascending_node) | _Ω_       | The Horizontall orientation the ascending node of the ellipse.                                           |
 * | [True anomaly](https://en.wikipedia.org/wiki/True_anomaly)                                       | _ν θ f_   | The position of the orbiting body along the ellipse at a specific time.                                  |
 * | [Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)                             | _E_       | The angular parameter that defines the position of a body that is moving along an elliptic Kepler orbit. |
 * | [Mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)                                       | _M_       | The mathematically convenient fictitious "angle" which varies linearly with time.                        |
 * | Radius                                                                                           | _r_       | The radius form focal center to orbiting object.                                                         |
 */
class KeplerianOrbit {
	/**Creates `KeplerianOrbit` class that encapsulate the data of a _[Keplerian orbit](https://en.wikipedia.org/wiki/Kepler_orbit)_.
	 *
	 * @param {number} semimajor_axis The half distance between the apoapsis and periapsis.
	 * @param {number} eccentricity The shape of the ellipse.
	 * @param {number} argument_of_periapsis The orientation of the ellipse in the orbital plane.
	 * @param {boolean} clockwise Whether or not the orbit is clockwise or not.
	 */
	constructor(
		semimajor_axis,
		eccentricity = 0.0,
		argument_of_periapsis = 0,
		clockwise = false
	) {
		this.semimajor_axis = Math.abs(semimajor_axis)
		this.eccentricity = Math.abs(eccentricity)
		this.argument_of_periapsis = argument_of_periapsis
		this.clockwise = clockwise
	}

	/**
	 * Gets the _[semiminor axis](https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes)_ of the orbit.
	 * ```
	 * b = a * sqrt(1 - e^2)
	 * ```
	 *
	 * @returns {number} The _[semiminor axis](https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes)_ of the orbit.
	 */
	semiminor_axis() {
		return (
			this.semimajor_axis *
			Math.sqrt(1.0 - this.eccentricity * this.eccentricity)
		)
	}

	/**
	 * Gets the _[focal point](https://en.wikipedia.org/wiki/Ellipse#Definition_as_locus_of_points)_ of the orbit.
	 * ```
	 * f = e * a
	 * ```
	 *
	 * @returns {number} The _[Focal point](https://en.wikipedia.org/wiki/Ellipse#Definition_as_locus_of_points)_ distance of the orbit.
	 */
	focal_point() {
		return this.eccentricity * this.semimajor_axis
	}

	/**
	 * Gets the _[periapsis](https://en.wikipedia.org/wiki/Apsis)_ radius of the orbit.
	 * That is is the nearest point in the orbit of a planetary body about its primary body.
	 * ```
	 * periapsis = a * (1 - e)
	 * ```
	 *
	 * @returns {number} The nearest point in the orbit.
	 */
	periapsis() {
		return (1.0 - this.eccentricity) * this.semimajor_axis
	}

	/**
	 * Gets the _[apoapsis](https://en.wikipedia.org/wiki/Apsis)_ radius of the orbit.
	 * That is is the farthest point in the orbit of a planetary body about its primary body.
	 * ```
	 * apoapsis = a * (1 + e)
	 * ```
	 *
	 * @returns {number} The farthest point in the orbit.
	 */
	apoapsis() {
		return (1.0 + this.eccentricity) * this.semimajor_axis
	}

	/**
	 * Rotates a point from mathematical coordinates into local coordinates.
	 *
	 * @param {*} point
	 * @returns The rotated point.
	 */
	rotate_point({ x, y }) {
		y = this.clockwise ? -y : y

		const cos = Math.cos(this.argument_of_periapsis)
		const sin = Math.sin(this.argument_of_periapsis)
		return {
			x: x * cos + y * sin,
			y: y * cos - x * sin,
		}
	}

	/**
	 * **Unique to 2D orbits!**
	 * Gets whether or not the orbit is clockwise or not.
	 *
	 * @returns {bool} Boolean indicating clockwise orbit.
	 */
	is_clockwise() {
		return this.clockwise
	}
}

/**
 * The `TrueAnomaly` class encapsulate the data of a _[True anomaly](https://en.wikipedia.org/wiki/True_anomaly)_.
 *
 * | Name                                                                               | Notation  | Description                                                                                              |
 * |-----------------------------------------------------------------------------------:|:---------:|:---------------------------------------------------------------------------------------------------------|
 * | [Semimajor axis](https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes)     | _a_       | The half distance between the apoapsis and periapsis.                                                    |
 * | [Focal point](https://en.wikipedia.org/wiki/Ellipse#Definition_as_locus_of_points) | _c_       | The distance between the elipse center and its focal point.                                              |
 * | [Eccentricity](https://en.wikipedia.org/wiki/Orbital_eccentricity)                 | _e_       | The shape of the ellipse.                                                                                |
 * | [True anomaly](https://en.wikipedia.org/wiki/True_anomaly)                         | _ν θ f_   | The position of the orbiting body along the ellipse at a specific time.                                  |
 * | [Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)               | _E_       | The angular parameter that defines the position of a body that is moving along an elliptic Kepler orbit. |
 * | [Mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)                         | _M_       | The mathematically convenient fictitious "angle" which varies linearly with time.                        |
 * | Radius                                                                             | _r_       | The radius form focal center to orbiting object.                                                         |
 */
class TrueAnomaly {
	/**
	 * Creates `TrueAnomaly` class that encapsulate the data of a _[True anomaly](https://en.wikipedia.org/wiki/True_anomaly)_.
	 *
	 * @param {number} angle The angle in **radians**.
	 */
	constructor(angle = 0) {
		this.angle = angle
	}

	/**
	 * Sets the _[True anomaly](https://en.wikipedia.org/wiki/True_anomaly)_ angle in **degrees**.
	 *
	 * @param {number} angle The angle in **degrees**.
	 * @returns {TrueAnomaly} `self`
	 */
	set_degrees(angle) {
		this.angle = angle * (Math.PI / 180.0)
		return this
	}

	/**
	 * Gets the _[True anomaly](https://en.wikipedia.org/wiki/True_anomaly)_ angle in **degrees**.
	 *
	 * @returns {number} The angle in **degrees**.
	 */
	get_degrees() {
		return this.angle * (180.0 / Math.PI)
	}

	/**
	 * Gets the radius form _focal center_ to _orbiting object_ given a _[true anomaly](https://en.wikipedia.org/wiki/True_anomaly)_.
	 * ```
	 * r = a * (1 - e ^ 2) / (1 + e * cos(θ))
	 * ```
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {number} The radius form _focal center_ to orbiting object.
	 */
	radius(orbit) {
		return (
			(orbit.semimajor_axis *
				(1.0 - orbit.eccentricity * orbit.eccentricity)) /
			(1.0 + orbit.eccentricity * Math.cos(this.angle))
		)
	}

	/**
	 * Gets a **point** object from a given _[true anomaly](https://en.wikipedia.org/wiki/True_anomaly)_ of the orbit in mathematical space.
	 * ```
	 * p = (r * cos(θ), r * sin(θ))
	 * ```
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {object} The **point** object.
	 */
	point(orbit) {
		const radius = this.radius(orbit)
		let angle = this.angle + orbit.argument_of_periapsis

		return {
			x: Math.cos(angle) * radius,
			y: Math.sin(angle) * radius,
		}
	}

	/**
	 * Gets a **point** object from a given _[true anomaly](https://en.wikipedia.org/wiki/True_anomaly)_ of the orbit in local space.
	 * ```
	 * p = (r * cos(θ), r * sin(θ))
	 * ```
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {object} The **point** object.
	 */
	point2d(orbit) {
		return orbit.rotate_point(this.point(orbit))
	}

	/**
	 * Converts a given _[true anomaly](https://en.wikipedia.org/wiki/True_anomaly)_ in to a _[eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_.
	 * ```
	 * atan2( (point(θ) + (f, 0)) / (a, b) )
	 * ```
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {EccentricAnomaly} The _[Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ of the orbit.
	 */
	eccentric_anomaly(orbit) {
		const { x, y } = this.point(orbit)

		const angle = Math.atan2(
			y / orbit.semiminor_axis(),
			(x + orbit.focal_point()) / orbit.semimajor_axis
		)

		return new EccentricAnomaly(angle)
	}

	/**
	 * Converts a given _[true anomaly](https://en.wikipedia.org/wiki/True_anomaly)_ in to a _[mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_.
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {MeanAnomaly} The _[Mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_ of the orbit.
	 */
	mean_anomaly(orbit) {
		return this.eccentric_anomaly(orbit).mean_anomaly(orbit)
	}
}

/**
 * The `EccentricAnomaly` class encapsulate the data of a _[Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_.
 *
 * | Name                                                                               | Notation  | Description                                                                                              |
 * |-----------------------------------------------------------------------------------:|:---------:|:---------------------------------------------------------------------------------------------------------|
 * | [Semimajor axis](https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes)     | _a_       | The half distance between the apoapsis and periapsis.                                                    |
 * | [Semiminor axis](https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes)     | _b_       | The line segment that is at right angles with the semi-major axis.                                       |
 * | [Focal point](https://en.wikipedia.org/wiki/Ellipse#Definition_as_locus_of_points) | _c_       | The distance between the elipse center and its focal point.                                              |
 * | [Eccentricity](https://en.wikipedia.org/wiki/Orbital_eccentricity)                 | _e_       | The shape of the ellipse.                                                                                |
 * | [True anomaly](https://en.wikipedia.org/wiki/True_anomaly)                         | _ν θ f_   | The position of the orbiting body along the ellipse at a specific time.                                  |
 * | [Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)               | _E_       | The angular parameter that defines the position of a body that is moving along an elliptic Kepler orbit. |
 * | [Mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)                         | _M_       | The mathematically convenient fictitious "angle" which varies linearly with time.                        |
 * | Radius                                                                             | _r_       | The radius form focal center to orbiting object.                                                         |
 */
class EccentricAnomaly {
	/**
	 * Creates `EccentricAnomaly` class that encapsulate the data of a _[Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_.
	 *
	 * @param {number} angle The angle in **radians**.
	 */
	constructor(angle = 0) {
		this.angle = angle
	}

	/**
	 * Sets the _[Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ angle in **degrees**.
	 *
	 * @param {number} angle The angle in **degrees**.
	 * @returns {TrueAnomaly} `self`
	 */
	set_degrees(angle) {
		this.angle = angle * (Math.PI / 180.0)
		return this
	}

	/**
	 * Gets the _[Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ angle in **degrees**.
	 *
	 * @returns {number} The angle in **degrees**.
	 */
	get_degrees() {
		return this.angle * (180.0 / Math.PI)
	}

	/**
	 * Gets the radius form _focal center_ to _orbiting object_ given a _[eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_.
	 * ```
	 * r = len( p )
	 * ```
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {number} The radius form _focal center_ to orbiting object.
	 */
	radius(orbit) {
		//this.true_anomaly(orbit).radius(orbit)
		const { x, y } = this.position(orbit)
		return Math.sqrt(x * x + y * y)
	}

	/**
	 * Gets a **point** object from a given _[eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ of the orbit in mathematical space.
	 * ```
	 * p = Rotation_Matrix * (a * cos(E) - f, b * sin(E))
	 * ```
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {object} The **point** object.
	 */
	point(orbit) {
		return {
			x:
				Math.cos(this.angle) * orbit.semimajor_axis -
				orbit.focal_point(),
			y: Math.sin(this.angle) * orbit.semiminor_axis(),
		}
	}

	/**
	 * Gets a **point** object from a given _[eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ of the orbit in local space.
	 * ```
	 * p = Rotation_Matrix * (a * cos(E) - f, b * sin(E))
	 * ```
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {object} The **point** object.
	 */
	point2d(orbit) {
		return orbit.rotate_point(this.point(orbit))
	}

	/**
	 * Converts a given _[eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ in to a _[true anomaly](https://en.wikipedia.org/wiki/True_anomaly)_.
	 * ```
	 * θ = atan2( p )
	 * ```
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {TrueAnomaly} The _[Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ of the orbit.
	 */
	true_anomaly(orbit) {
		const { x, y } = this.point(orbit)
		const angle = Math.atan2(y, x)
		return new TrueAnomaly(angle)
	}

	/**
	 * Converts a given _[eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ in to a _[mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_.
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {MeanAnomaly} The _[Mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_ of the orbit.
	 */
	mean_anomaly(orbit) {
		return new MeanAnomaly(
			this.angle - orbit.eccentricity * Math.sin(this.angle)
		)
	}
}

/**
 * The `MeanAnomaly` class encapsulate the data of a _[Mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_.
 *
 * | Name                                                                               | Notation  | Description                                                                                              |
 * |-----------------------------------------------------------------------------------:|:---------:|:---------------------------------------------------------------------------------------------------------|
 * | [Semimajor axis](https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes)     | _a_       | The half distance between the apoapsis and periapsis.                                                    |
 * | [Semiminor axis](https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes)     | _b_       | The line segment that is at right angles with the semi-major axis.                                       |
 * | [Focal point](https://en.wikipedia.org/wiki/Ellipse#Definition_as_locus_of_points) | _c_       | The distance between the elipse center and its focal point.                                              |
 * | [Eccentricity](https://en.wikipedia.org/wiki/Orbital_eccentricity)                 | _e_       | The shape of the ellipse.                                                                                |
 * | [True anomaly](https://en.wikipedia.org/wiki/True_anomaly)                         | _ν θ f_   | The position of the orbiting body along the ellipse at a specific time.                                  |
 * | [Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)               | _E_       | The angular parameter that defines the position of a body that is moving along an elliptic Kepler orbit. |
 * | [Mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)                         | _M_       | The mathematically convenient fictitious "angle" which varies linearly with time.                        |
 * | Radius                                                                             | _r_       | The radius form focal center to orbiting object.                                                         |
 */
class MeanAnomaly {
	/**
	 * Creates `MeanAnomaly` class that encapsulate the data of a _[Mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_.
	 *
	 * @param {number} angle The angle in **radians**.
	 */
	constructor(angle = 0) {
		this.angle = angle
	}

	/**
	 * Sets the _[Mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_ angle in **degrees**.
	 *
	 * @param {number} angle The angle in **degrees**.
	 * @returns {TrueAnomaly} `self`
	 */
	set_degrees(angle) {
		this.angle = angle * (Math.PI / 180.0)
		return this
	}

	/**
	 * Gets the _[Mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_ angle in **degrees**.
	 *
	 * @returns {number} The angle in **degrees**.
	 */
	get_degrees() {
		return this.angle * (180.0 / Math.PI)
	}

	/**
	 * Gets the radius form _focal center_ to _orbiting object_ given a _[mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_.
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {number} The radius form _focal center_ to orbiting object.
	 */
	radius_at_mean_anomaly(orbit) {
		this.true_anomaly(orbit).radius(orbit)
	}

	/**
	 * Gets a **DVec2** point from a given _[mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_ of the orbit in mathematical space.
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {object} The **point** object.
	 */
	point(orbit) {
		return this.eccentric_anomaly(orbit).point(orbit)
	}

	/**
	 * Gets a **DVec2** point from a given _[mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_ of the orbit in local space.
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {object} The **point** object.
	 */
	point2d(orbit) {
		return this.eccentric_anomaly(orbit).point2d(orbit)
	}

	/**
	 * Converts a given _[mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_ in to a _[true anomaly](https://en.wikipedia.org/wiki/True_anomaly)_.
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {TrueAnomaly} The _[Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ of the orbit.
	 */
	true_anomaly(orbit) {
		return this.eccentric_anomaly(orbit).true_anomaly(orbit)
	}

	/**
	 * Converts a given _[mean anomaly](https://en.wikipedia.org/wiki/Mean_anomaly)_ in to a _[eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ using [Newton's method](https://en.wikipedia.org/wiki/Newton%27s_method).
	 *
	 * @param {KeplerianOrbit} orbit The orbit in question.
	 * @returns {EccentricAnomaly} The _[Eccentric anomaly](https://en.wikipedia.org/wiki/Eccentric_anomaly)_ of the orbit.
	 */
	eccentric_anomaly(orbit) {
		const tolerance = 0.00001 * (Math.PI / 180)
		let eccentric_anomaly = this.angle

		for (let i = 0; i < 10; i++) {
			const f =
				eccentric_anomaly -
				orbit.eccentricity * Math.sin(eccentric_anomaly) -
				this.angle

			const clamp = (x, min, max) => Math.min(Math.max(x, min), max)

			eccentric_anomaly -= clamp(
				f / (1.0 - orbit.eccentricity * Math.cos(eccentric_anomaly)),
				-orbit.eccentricity / 2.0,
				orbit.eccentricity / 2.0
			)

			if (Math.abs(f) < tolerance)
				return new EccentricAnomaly(eccentric_anomaly)
		}

		return new EccentricAnomaly(eccentric_anomaly)
	}
}
