export const getCampaigns = async() =>{
	try{
		const response = await fetch("https://infinion-test-int-test.azurewebsites.net/api/Campaign")

		const data = await response.json()
		// console.log(data, "data")
		return data
	}catch(err){
		console.log(err, "err")
	}
}


export async function getCampaignById(id){
	try{
		const response = await fetch(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`)

		const data = await response.json()
		// console.log(data, "data")
		return data
	}catch(err){
		console.log(err, "err")
	}
}
// getCampaigns()