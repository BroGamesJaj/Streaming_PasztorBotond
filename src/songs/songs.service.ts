import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

import { PrismaService } from 'src/prisma.service';
@Injectable()
export class SongsService {
  db: PrismaService;
  constructor(db: PrismaService){
    this.db = db;
  }
  create(createSongDto: CreateSongDto) {
    return this.db.song.create({
      data: {
        cim: createSongDto.cim,
        szerzo: createSongDto.szerzo,
        hossz: createSongDto.hossz,
        ar: createSongDto.ar || undefined,
        ertekeles: createSongDto.ertekeles
      }
    });
  }

  findAll() {
    return this.db.song.findMany()
  }

  findOne(id: number) {
    return this.db.song.findUnique({
      where: { id}
    })
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return this.db.song.update({
      where: {id},
      data: {
        cim: updateSongDto.cim || undefined,
        szerzo: updateSongDto.szerzo || undefined,
        hossz: updateSongDto.hossz || undefined,
        ar: updateSongDto.ar || undefined,
        ertekeles: updateSongDto.ertekeles || undefined

      }
    })
  }

  remove(id: number) {
    return this.db.song.delete({
      where: {id}
    })
  }

  free(){
    return this.db.song.findMany({
      where: {ar: 0}
    })
  }

  topSongs(count: number){
    return this.db.song.findMany({
      take: count,
      orderBy: {ertekeles: 'desc'},
    })
  }

  popularArtists(){
    return this.db.song.groupBy({
      by: ['szerzo'],
      _count: {
        szerzo: true,
      },
      orderBy: {
        _count: {
          szerzo: 'desc',
        },
      },
    }).then((result) => (
      result.map((r) =>({
        "szerzo": r.szerzo,
        "numberOfSongs": r._count.szerzo,
      }))
    ))
  }
}
