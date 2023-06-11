from flask import request, jsonify
from flask_restful import Resource

from classes.utils import command_format


class Writer(Resource):
    def __init__(self, **kwargs):
        self.connections = kwargs['connections']

    def get(self):
        if request.query_string is not None or request.query_string != "":
            with self.connections.cursor() as cursor:
                # get all
                if request.args['wid'] == "*":
                    drive = []
                    sql = "SELECT * FROM `tbl_writer`"
                    cursor.execute(sql)
                    result = cursor.fetchall()
                    for i in result:
                        data = {
                            'write_id': i[0],
                            'writer_name': i[1],
                            'writer_description': i[2],
                        }
                        drive.append(data)
                    return drive, 200

                # get by id
                else:
                    sql = "SELECT * FROM `tbl_writer` WHERE `write_id`=%s"
                    cursor.execute(sql, (request.args['wid']))
                    result = cursor.fetchone()
                    data = {
                        'write_id': result[0],
                        'writer_name': result[1],
                        'writer_description': result[2],
                    }
                    return data, 200
        else:
            return {"status": "error"}

    def post(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)["data"]
            with self.connections.cursor() as cursor:
                sql_insert = "INSERT INTO tbl_writer (write_id, writer_name, writer_description) " \
                           "VALUES ('{}', '{}','{}');"
                sql_post = sql_insert.format(data['write_id'], data['writer_name'], data['writer_description'])
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
            writer_id = data['write_id']
            with self.connections.cursor() as cursor:
                sql_delete = "DELETE FROM tbl_writer WHERE write_id=%s"
                # Execute the query
                cursor.execute(sql_delete, writer_id)
                # the connection is not autocommit by default. So we must commit to save our changes.
                self.connections.commit()
            return {"status": "success"}, 200
        else:
            return {"status": "error"}, 404

    def put(self):
        if request.is_json:
            # convert to json
            data = request.get_json(force=True)["data"]
            sql_put = "update tbl_writer set {} where {};"
            with self.connections.cursor() as cursor:
                cursor.execute(command_format(data, sql_put))
                self.connections.commit()
            return {'status': 'success'}, 200
        else:
            return {"status": "error"}, 404
