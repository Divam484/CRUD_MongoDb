const { usersRoutes } = require("../services/users");
const { companyRoutes } = require("../services/company")
const CronJob = require('cron').CronJob;
const moment = require('moment')
const Company = require('../services/company/company.model')


const initialize = (app) => {
	app.use("/api/v1/user", usersRoutes);
	app.use("/api/v1/company",companyRoutes);
	

		//Cron runs every night at 00:01
		// cron.schedule('*/10 * * * * *',()=>{
			//     console.log('running the task every 10 seconds',moment().format('DD MM YYYY hh:mm:ss'))
			// })
		var PlanAssignStatusUpdateJob = new CronJob('*/10 * * * * *', async function () {
			// var PlanAssignStatusUpdateJob = new CronJob('    *', async function () {
			// every minutes -     *
			// every night 00:01 - 1 0   *
	
			// let In_Active = await Company.updateMany({ status: 'active'},{status:'In-Active'});
			let Active = await Company.updateMany({ status: 'In-Active'},{status:'active'});
	
			console.log("Plan expire CRON job Every 10 sec:", moment());
	
		})
		PlanAssignStatusUpdateJob.start();
		PlanAssignStatusUpdateJob.stop();



};

module.exports = { initialize };
