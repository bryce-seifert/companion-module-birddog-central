// ##########################
// #### Define Variables ####
// ##########################
export function updateVariableDefinitions() {
	const variables = []

	variables.push({ name: 'Software version', variableId: 'version' })
	variables.push({ name: 'Central 2.0 version', variableId: 'access' })

	if (this.central.access >= 0) {
		if (this.central.routers.length > 0) {
			this.central.routers.forEach((element, index) => {
				let name = element.label
				name = this.validName(name)
				variables.push({ name: 'Router ' + name, variableId: 'router_' + name })
				variables.push({
					name: 'Router ' + name + ' current output',
					variableId: 'router_' + name + '_output',
				})
			})
		}

		if (this.central.generators.length > 0) {
			this.central.generators.forEach((element, index) => {
				let name = element.label
				name = this.validName(name)
				variables.push({ name: 'Generator ' + element.label, variableId: 'generator_' + name })
				variables.push({
					name: 'Generator ' + element.label + ' loop',
					variableId: 'generator_' + name + '_loop',
				})
				variables.push({
					name: 'Generator ' + element.label + ' status',
					variableId: 'generator_' + name + '_status',
				})
			})
		}

		if (this.central.retransmitters.length > 0) {
			this.central.retransmitters.forEach((element, index) => {
				let name = element.label
				name = this.validName(name)
				variables.push({ name: 'Retransmitter ' + element.label, variableId: 'retransmitter_' + name })
				variables.push({
					name: 'Retransmitter ' + element.label + ' audio name',
					variableId: 'retransmitter_' + name + '_audioname',
				})
				variables.push({
					name: 'Retransmitter ' + element.label + ' audio status',
					variableId: 'retransmitter_' + name + '_audiostatus',
				})
				variables.push({
					name: 'Retransmitter ' + element.label + ' video name',
					variableId: 'retransmitter_' + name + '_videoname',
				})
				variables.push({
					name: 'Retransmitter ' + element.label + ' video status',
					variableId: 'retransmitter_' + name + '_videostatus',
				})
			})
		}
	}

	return variables
}

// #########################
// #### Update Variables ####
// #########################
export function updateVariables() {
	let accessLevel = 'Lite'
	if (this.central.access < 0) {
		accessLevel = 'Lite'
	} else if (this.central.access > 0) {
		accessLevel = 'Enterprise'
	} else {
		accessLevel = 'Pro'
	}

	this.setVariableValues({ version: this.central.version, access: accessLevel })

	if (this.central.access >= 0) {
		if (this.central.routers.length > 0) {
			this.central.routers.forEach((element, index) => {
				let name = element.label
				name = this.validName(name)
				this.setVariableValues({
					[`router_${name}`]: element.label,
					[`router_${name}_output`]: element.name,
				})
			})
		}

		if (this.central.generators.length > 0) {
			this.central.generators.forEach((element, index) => {
				let name = element.label
				name = this.validName(name)
				this.setVariableValues({
					[`generator_${name}`]: element.label,
					[`generator_${name}_loop`]: element.loop,
				})
			})
		}

		if (this.central.retransmitters.length > 0) {
			this.central.retransmitters.forEach((element, index) => {
				let name = element.label
				name = this.validName(name)
				this.setVariableValues({
					[`retransmitter_${name}`]: element.label,
					[`retransmitter_${name}_audioname`]: element.AudioNDIname,
					[`retransmitter_${name}_audiostatus`]: element.AudioPlayStatus,
					[`retransmitter_${name}_videoname`]: element.VideoNDIname,
					[`retransmitter_${name}_videostatus`]: element.VideoPlayStatus,
				})
			})
		}
	}
}
