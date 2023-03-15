import { Controller, Get, Render } from '@nestjs/common';

@Controller('router')
export class RouterController {
  @Get('/')
  @Render('test.ejs')
  getTest() {
    return { msg: 'test' };
  }
}

// @Controller('comment')
// export class RouterController {
//   @Get('/')
//   @Render('comment.ejs')
//   getTest() {
//     return { msg: 'test' };
//   }
// }
