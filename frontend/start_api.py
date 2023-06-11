from flask import Flask
from flask_restful import Api
from classes.tbl_song import Song
from classes.tbl_song_type import Song_type
from classes.tbl_song_writer import Song_writer
from classes.tbl_album import Album
from classes.tbl_singer import Singer
from classes.tbl_writer import Writer
from classes.tbl_begin import Begin
import pymysql
from classes.utils import read_config
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
api = Api(app)

conf = read_config()

connections = pymysql.connect(host=conf['DATABASE_00']['host'], user=conf['DATABASE_00']['user'],
                              password=conf['DATABASE_00']['password'], db=conf['DATABASE_00']['db'])


api.add_resource(Song, '/song', resource_class_kwargs={"connections": connections})
api.add_resource(Song_type, '/song_type', resource_class_kwargs={"connections": connections})
api.add_resource(Song_writer, '/song_writer', resource_class_kwargs={"connections": connections})
api.add_resource(Album, '/album', resource_class_kwargs={"connections": connections})
api.add_resource(Singer, '/singer', resource_class_kwargs={"connections": connections})
api.add_resource(Writer, '/writer', resource_class_kwargs={"connections": connections})
api.add_resource(Begin, '/begin', resource_class_kwargs={"connections": connections})


if __name__ == '__main__':
    app.run(debug=True)
