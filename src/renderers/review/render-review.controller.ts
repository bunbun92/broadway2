import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('render-review')
export class ReviewController {
  @Get('/create')
  @Render('reviewCreate.ejs')
  getDetail() {
    return { message: 'thank you!' };
  }

  @Get('/comment')
  async getReviewComment(
    @Res() res: Response,
    @Req() req: Request
  ): Promise<any> {
    const jwt = req.cookies.jwt;
    if (!jwt) {
      const loginFalse = { login: false };
      console.log('false', jwt);
      res.render('reviewComment.ejs', loginFalse);
    } else {
      const loginTrue = { login: true };
      console.log('true', jwt);
      res.render('reviewComment.ejs', loginTrue);
    }
  }

  @Get('/manage')
  @Render('reviewManage.ejs')
  getReviewManage() {
    return { message: 'thank you!' };
  }

  @Get('/update')
  @Render('reviewUpdate.ejs')
  getReviewUpdate() {
    return { message: 'thank you!' };
  }
}
