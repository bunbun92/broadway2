import { Controller, Get, Render, Param } from '@nestjs/common';

@Controller('reviews')
export class CommentController {
  @Get('/:reviewId/comments')
  // reveiws/1/comments
  @Render('comment.ejs')
  getComments(@Param('reviewId') reviewId: string) {
    return { reviewId };
  }
}
