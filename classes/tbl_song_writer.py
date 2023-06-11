from flask import request, jsonify
from flask_restful import Resource

from classes.utils import command_format


class Song_writer(Resource):
    def __init__(self, **kwargs):
        self.connections = kwargs['connections']

    def get(self):
        if request.query_string is not None or request.query_string != "":
            with self.connections.cursor() as cursor:
                # get all
                if request.args['swid'] == "*":
                    drive = []
                    sql = "SELECT * FROM `tbl_song_writer`"
                    cursor.execute(sql)
                    result = cursor.fetchall()
                    for i in result:
                        data = {
                            'song_writer_id': i[0],
                            'write_date': i[1].strftime('%Y-%m-%d %H:%M:%S'),  # Convert datetime to string
                            'writer_id': i[2],
                            # 'hometown': i[3],
                            # 'date_of_birth': i[4].strftime('%Y-%m-%d %H:%M:%S'),  # Convert datetime to string
                        }
                        drive.append(data)
                    return drive, 200
                # get by id
                else:
                    sql = "SELECT * FROM `tbl_song_writer` WHERE `song_writer_id`=%s"
                    cursor.execute(sql, (request.args['swid'],))
                    result = cursor.fetchone()
                    if result is not None:
                        data = {
                            'song_writer_id': result[0],
                            'write_date': result[1].strftime('%Y-%m-%d %H:%M:%S'),  # Convert datetime to string
                            'writer_id': result[2],
                            # 'singer_id': result[0],
                            # 'singer_name': result[1],
                            # 'singer_description': result[2],
                            # 'hometown': result[3],
                            # 'date_of_birth': result[4].strftime('%Y-%m-%d %H:%M:%S'),  # Convert datetime to string
                        }
                        return data, 200
                    else:
                        return {"status": "not found"}, 404
        else:
            return {"status": "error"}, 400
    # def get(self):
    #     if 'song_writer_id' != "":
    #         cur = self.connections.cursor()
    #         drive = []
    #         sql = "SELECT * FROM tbl_song_writer"
    #         cur.execute(sql)
    #         result = cur.fetchall()
    #         for i in result:
    #             data = {
    #                 'song_writer_id': i[0],
    #                 'writer_date': i[1],
    #                 'write_id': i[3],
    #             }
    #             drive.append(data)
    #         return jsonify(result)
    #     else:
    #         cur = self.connections.cursor()
    #         sql = "SELECT * FROM tbl_song_writer WHERE song_writer_id=%s"
    #         drive = []
    #         cur.execute(sql, ('song_writer_id',))
    #         result = cur.fetchone()
    #         for i in result:
    #             data = {
    #                 'song_writer_id': i[0],
    #                 'writer_date': i[1],
    #                 'write_id': i[3],
    #             }
    #             drive.append(data)
    #         return jsonify(result)

    def post(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)["data"]
            with self.connections.cursor() as cursor:
                sql_insert = "INSERT INTO tbl_song_writer (song_writer_id, write_date, writer_id) " \
                           "VALUES ('{}', '{}','{}');"
                sql_post = sql_insert.format(data['song_writer_id'], data['write_date'], data['writer_id'])
                print(sql_post)
                cursor.execute(sql_post)
                self.connections.commit()
            return {'status': 'success'}, 200
        else:
            return {"status": "error"}, 404

    def delete(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)["data"]
            song_writer_id = data['song_writer_id']
            with self.connections.cursor() as cursor:
                sql_delete = "DELETE FROM tbl_song_writer WHERE song_writer_id=%s"
                # Execute the query
                cursor.execute(sql_delete, song_writer_id)
                # the connection is not autocommit by default. So we must commit to save our changes.
                self.connections.commit()
            return {"status": "success"}, 200
        else:
            return {"status": "error"}, 404

    def put(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)["data"]
            sql_put = "update tbl_song_writer set {} where {};"
            with self.connections.cursor() as cursor:
                cursor.execute(command_format(data, sql_put))
                self.connections.commit()
            return {'status': 'success'}, 200
        else:
            return {"status": "error"}, 404
