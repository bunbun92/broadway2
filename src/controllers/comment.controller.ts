import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

// review/:id/comments/
@Controller('comments')
export class CommentController {
  constructor(
    private readonly CommentService: CommentService,
    private jwtService: JwtService
  ) {}

  // localhost:3000/comment

  // check Api
  @Get('/get/:reviewId')
  async getAllComments(@Query('reviewId') reviewId, @Req() req: Request) {
    const jwt = req.cookies.jwt;
    const currentUserId = this.jwtService.verify(jwt)['id'];

    if (reviewId) {
      return await this.CommentService.getCommentByReviewId(
        reviewId,
        currentUserId
      );
    } else {
      return await this.CommentService.getAllComments();
    }
  }

  @Post('/create/:reviewId')
  async createComments(@Body() data: CreateCommentDto, @Req() req: Request) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];

    return await this.CommentService.createComment(
      userId,
      data.reviewId,
      data.comment
    );
  }

  // 특정공연 리뷰에 대한 댓글

  // /contents/1/rewiews/1/comments
  // /comments/2

  // comments/:reviewId
  @Get('/:id')
  async getComments(@Param('id') id: number) {
    return this.CommentService.getComments(id);
  }

  // /comments/9

  @Put('/update/:id')
  async updateComment(@Param('id') id: number, @Body() data: UpdateCommentDto) {
    return await this.CommentService.updateComment(id, data.comment);
  }

  @Delete('/delete/:id')
  deleteComment(@Param('id') commentId: number) {
    return this.CommentService.deleteComment(commentId);
  }
}

// @Post('/comment')
// async getAllContents() {
//   return await this.CommentService.getAllContents();
// }
