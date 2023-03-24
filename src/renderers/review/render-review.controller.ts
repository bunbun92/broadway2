import { Controller, Get, Render } from '@nestjs/common';

@Controller('render-review')
export class ReviewController {
  @Get('/:performId/create')
  @Render('detailCreateReview.ejs')
  getDetail() {
    return { message: 'thank you!' };
  }
}
