
import axios from 'axios';

const JobsProvider = { 



    GetJobs : async ( keyword, callback, that) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const toCallBack = (response) => {
            callback(that, response.data.jobs.job);
        }
        axios.get('https://bbc.uat-tribepad.com/members/oauth/api/job/search.json',
        { 
            params: {
                keywords:keyword,
                pageNum:1
            },
            cancelToken: source.canceltoken
        })
        .then(toCallBack)
         .catch(error => {

         });   
    },

}

export default JobsProvider;