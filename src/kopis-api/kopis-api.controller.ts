import { Controller, Get } from '@nestjs/common';
import { KopisApiService } from './kopis-api.service';
import axios from 'axios';
import convert from 'xml-js';
//import {KopisApi} from '../entities/kopisApi.entity'

@Controller('kopis-api')
export class KopisApiController {
  constructor(private readonly kopisApiService: KopisApiService) {}

  @Get('/kopis')
  async kopisCreate() {
    // axios request

    // axios({
    //   method : 'get',
    //   url:  'https://www.kopis.or.kr/openApi/restful/pblprfr?service=8ac72359a2b74f5f883f610f5d8df103&stdate=20230308&eddate=20231231&cpage=1&rows=1000';
    // }).then((res)=>{
    //   console.log(res)
    //   return await this.kopisApiService.kopisCreate();
    // })

    const request = require('request');
    let parseString = require('xml2js').parseString;

    request(
      'https://www.kopis.or.kr/openApi/restful/pblprfr?service=8ac72359a2b74f5f883f610f5d8df103&stdate=20230308&eddate=20231231&cpage=1&rows=10',
      function (error, response, body) {
        parseString(body, function (err, result) {
          let parseData = result;
          console.log('apseer');
          console.log(parseData.dbs.db[0]);
          console.log(parseData.dbs.db[1]);
          console.log(parseData.dbs.db[2]);
          console.log(parseData.dbs.db.length);

          const kopisApiResult = [];

          for (let i = 0; i < parseData.dbs.db.length; i++) {
            const resultApi = parseData.dbs.db[i];

            console.log('hihi');
            console.log(resultApi);

            kopisApiResult.push({
              mt20id: resultApi.mt20id[0],
              prfnm: resultApi.mt20id[0],
              prfpdfrom: resultApi.prfpdfrom[0],
              prfpdto: resultApi.prfpdto[0],
              fcltynm: resultApi.fcltynm[0],
              poster: resultApi.poster[0],
              genrenm: resultApi.genrenm[0],
              prfstate: resultApi.prfstate[0],
              openrun: resultApi.openrun[0],
            });
          }
          console.log('haha');
          console.log(kopisApiResult);
          return this.kopisApiService.kopisCreate(kopisApiResult);
        });
      }
    );
    // const ois: OrderItem[] = [];
    // for (const req of reqs) {
    //   const oi = new OrderItem();
    //   ois.push(oi);
    // }
    // await oiRepo.insert(ois);

    // const apiUrl =
    //   'https://www.kopis.or.kr/openApi/restful/pblprfr?service=8ac72359a2b74f5f883f610f5d8df103&stdate=20230308&eddate=20231231&cpage=1&rows=1000';

    // const result = await axios.get(encodeURI(apiUrl));
    // console.log(result);
    // const response = convert.xml2json(result.data, {
    //   compact: true,
    //   spaces: 4,
    // });
    // console.log(response);
    // const { data } = response;
    // console.log(data);
  }
}
