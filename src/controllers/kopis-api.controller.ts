import { Controller, Get } from '@nestjs/common';
import { KopisApiService } from '../services/kopis-api.service';
import axios from 'axios';
import * as request from 'request';
import { parseString } from 'xml2js';

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

    // const request = require("request");
    // axios async/awiat로 변경 하시면 좋음
    request(
      'https://www.kopis.or.kr/openApi/restful/pblprfr?service=8ac72359a2b74f5f883f610f5d8df103&stdate=20230308&eddate=20231231&cpage=1&rows=1000',
      (error, response, body) => {
        parseString(body, async (err, result) => {
          const parseData = result;
          // console.log('apseer');
          // console.log(parseData.dbs.db[0]);
          // console.log(parseData.dbs.db[1]);
          // console.log(parseData.dbs.db[10]);
          // console.log(parseData.dbs.db.length);

          // for / map 구현
          // 1.DB : 1~10 존재 = [A]
          // 2. 1 ~20  새로 받음  = [B]
          // 3. for / map   A B 비교 해서 A 에 포함된것만 빼고 update insert

          const kopisApiResult = [];

          for (let i = 0; i < parseData.dbs.db.length; i++) {
            const resultApi = parseData.dbs.db[i];

            console.log('hihi');
            console.log(resultApi);

            kopisApiResult.push({
              performId: resultApi.mt20id[0],
              performName: resultApi.prfnm[0],
              startDate: resultApi.prfpdfrom[0],
              endDate: resultApi.prfpdto[0],
              theater: resultApi.fcltynm[0],
              poster: resultApi.poster[0],
              genrenm: resultApi.genrenm[0],
              performStatus: resultApi.prfstate[0],
              // openrun: resultApi.openrun[0],
            });
          }
          console.log('haha');
          console.log(kopisApiResult);
          return await this.kopisApiService.kopisCreate(kopisApiResult);
        });
      }
    );
  }
}

// 1. 데이터 베이스에서 mtid20 최대값을 찾는다
// 2. api 요청후 mtid20의 최소 값이 > 데이터 베이스에서 mtid20 최대갑
//                    [13  12 11] 10 9    > 10
