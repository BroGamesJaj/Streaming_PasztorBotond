import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get('free')
  free(){
    return this.songsService.free();
  }

  @Get('top')
  topsongs(@Query('count') count: string){
    return this.songsService.topSongs((count ? parseInt(count) : 10))
  }

  @Get('popularArtist')
  popularArtists(){
    return this.songsService.popularArtists()
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }

}
