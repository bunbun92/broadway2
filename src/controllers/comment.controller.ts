import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  Patch,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post('/')
  async createComments(@Body() data: CreateCommentDto) {
    return await this.CommentService.createComment(data);
  }

  // check Api
  @Get()
  async getAllComments() {
    return await this.CommentService.getAllComments();
  }

  // 특정공연 리뷰에 대한 댓글

  // /contents/1/rewiews/1/comments
  // /comments/2

  // @Get('/:id')

  //  /comments/1/comment

  // @Get('/:reviewId/comment')
  // async getComments(@Param('id') reviewId: number) {
  //   const comment = await this.CommentService.getComments(reviewId);

  //   return comment;
  // }

  // comments/2
  @Get('/:id')
  async getComments(@Param('id') id: number) {
    return this.CommentService.getComments(id);
  }

  // /comments/9

  @Put('/:id')
  async updateComment(@Param('id') id: number, @Body() data: UpdateCommentDto) {
    return await this.CommentService.updateComment(id, data);
  }

  @Delete('/:id')
  deleteComment(@Param('id') commentId: number) {
    return this.CommentService.deleteComment(commentId);
  }
}

// @Post('/comment')
// async getAllContents() {
//   return await this.CommentService.getAllContents();
// }
