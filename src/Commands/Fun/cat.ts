import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { CatResponse } from '../../Interfaces/Nekoslife'
import axios from 'axios'

interface CatApiResponse {
	breeds: unknown[]
	id: string
	url: string
	width: number
	height: number
}

export const command: Command = {
	name: 'cat',
	description: 'Get cat text and photo',
	aliases: [],
	run: async (client, message, args) => {
		const nekosResponse: CatResponse = (
			(await axios.get('https://nekos.life/api/v2/cat')) as AxiosResponse
		).data
		const catApiResponse: CatApiResponse = (
			(await axios.get(
				'https://api.thecatapi.com/v1/images/search'
			)) as AxiosResponse
		).data

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(nekosResponse.cat)
			.setImage(catApiResponse[0].url)

		return message.channel.send({ embeds: [Embed] })
	}
}
