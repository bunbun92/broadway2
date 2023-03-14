import { Controller, Get, Render } from '@nestjs/common';

@Controller('comment')
export class CommentController {
  @Get('/')
  @Render('comment.ejs')
  getTest4() {
    return { msg: '댓글 좀 .. ' };
  }
}
