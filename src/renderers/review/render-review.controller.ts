import { Controller, Get, Render } from '@nestjs/common';

@Controller('render-review')
export class ReviewController {
  @Get('/create')
  @Render('reviewCreate.ejs')
  getDetail() {
    return { message: 'thank you!' };
  }

  @Get('/comment')
  @Render('reviewComment.ejs')
  getReviewComment() {
    return { message: 'thank you!' };
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
