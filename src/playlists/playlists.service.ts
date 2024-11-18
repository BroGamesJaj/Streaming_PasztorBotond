import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class PlaylistsService {
  db: PrismaService;
  constructor(db: PrismaService){
    this.db = db;
  }
  create(createPlaylistDto: CreatePlaylistDto) {
    return this.db.playlist.create({
      data: createPlaylistDto
    });
  }

  addSong(listid: number, songid: number){
    return this.db.playlist.update({
      where: { id: listid},
      data: {
        songs: {
          connect: {id: songid}
        }
      }
    })
  }

  delSong(listid: number, songid: number){
    return this.db.playlist.update({
      where: { id: listid},
      data: {
        songs: {
          disconnect: {id: songid}
        }
      }
    })
  }
  
  findAll() {
    return this.db.playlist.findMany();
  }

  findOne(id: number) {
    return this.db.playlist.findUnique({
      where: { id},
      include: { songs: true }
    });
  }

  remove(id: number) {
    return this.db.playlist.delete({where: { id}});
  }
}
