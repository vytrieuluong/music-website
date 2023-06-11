from flask import request, jsonify
from flask_restful import Resource

from classes.utils import command_format


class Begin(Resource):
    def __init__(self, **kwargs):
        self.connections = kwargs['connections']

    def get(self):
        cur = self.connections.cursor()
        drive = []
        sql = "SELECT * FROM tbl_begin"
        cur.execute(sql)
        result = cur.fetchall()
        for i in result:
            data = {
                'song_id': i[0],
                'singer_id': i[1],
                'album_id': i[2],
                'date': i[3],
                'location': i[4],
            }
            drive.append(data)
        return jsonify(result)

    def post(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)["data"]

            with self.connections.cursor() as cursor:
                sql_insert = "INSERT INTO tbl_begin (date, location, song_id, album_id, singer_id) " \
                             "VALUES ('{}','{}', '{}', '{}', '{}')"
                sql_post = sql_insert.format(data['date'], data['location'],
                                             data['song_id'], data['album_id'], data['singer_id'])
                print(sql_post)
                cursor.execute(sql_post)
                self.connections.commit()
            return {'status': 'success'}, 200
        else:
            return {"status": "error"}, 404

    def delete(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)
            begin_id = data['song_id'], data['album_id'], data['singer_id']
            with self.connections.cursor() as cursor:
                sql_delete = "DELETE FROM tbl_begin WHERE begin_id=%s"
                # Execute the query
                cursor.execute(sql_delete, begin_id)
                # the connection is not autocommit by default. So we must commit to save our changes.
                self.connections.commit()
            return {"status": "success"}, 200
        else:
            return {"status": "error"}, 404

    def put(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)["data"]
            sql_put = "update tbl_begin set {} where {};"
            with self.connections.cursor() as cursor:
                cursor.execute(command_format(data, sql_put))
                self.connections.commit()
            return {'status': 'success'}, 200
        else:
            return {"status": "error"}, 404
