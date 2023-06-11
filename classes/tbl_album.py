from flask import request, jsonify
from flask_restful import Resource
# import datetime
from classes.utils import command_format


class Album(Resource):
    def __init__(self, **kwargs):
        self.connections = kwargs['connections']

    def get(self):
        if request.query_string is not None or request.query_string != "":
            with self.connections.cursor() as cursor:
                # get all
                if request.args['aid'] == "*":
                    drive = []
                    sql = "SELECT * FROM `tbl_album`"
                    cursor.execute(sql)
                    result = cursor.fetchall()
                    for i in result:
                        data = {
                            'album_id': i[0],
                            'album_name': i[1],
                            'album_description': i[2],
                            'album_date': i[3].strftime('%Y-%m-%d %H:%M:%S'),  # Convert datetime to string
                        }
                        drive.append(data)
                    return drive, 200
                # get by id
                else:
                    sql = "SELECT * FROM `tbl_album` WHERE `album_id`=%s"
                    cursor.execute(sql, (request.args['aid'],))
                    result = cursor.fetchone()
                    if result is not None:
                        data = {
                            'album_id': result[0],
                            'album_name': result[1],
                            'album_description': result[2],
                            'album_date': result[3].strftime('%Y-%m-%d %H:%M:%S'),  # Convert datetime to string
                        }
                        return data, 200
                    else:
                        return {"status": "not found"}, 404
        else:
            return {"status": "error"}, 400

    def post(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)["data"]
            with self.connections.cursor() as cursor:
                sql_insert = "INSERT INTO tbl_album (album_id, album_name, album_description, album_date) " \
                           "VALUES ('{}', '{}','{}', '{}');"
                sql_post = sql_insert.format(data['album_id'], data['album_name'], data['album_description'],
                                             data['album_date'])
                print(sql_post)
                cursor.execute(sql_post)
                self.connections.commit()
            return {'status': 'success'}, 200
        else:
            return {"status": "error"}

    def delete(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)["data"]
            album_id = data['album_id']
            with self.connections.cursor() as cursor:
                sql_delete = "DELETE FROM tbl_album WHERE album_id=%s"
                # Execute the query
                cursor.execute(sql_delete, album_id)
                # the connection is not autocommit by default. So we must commit to save our changes.
                self.connections.commit()
            return {"status": "success"}, 200
        else:
            return {"status": "error"}, 404

    def put(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)["data"]
            sql_put = "update tbl_album set {} where {};"
            with self.connections.cursor() as cursor:
                cursor.execute(command_format(data, sql_put))
                self.connections.commit()
            return {'status': 'success'}, 200
        else:
            return {"status": "error"}