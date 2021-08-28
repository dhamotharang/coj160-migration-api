import csv

def to_camel_case(snake_str):
    components = snake_str.split('_')
    # We capitalize the first letter of each component except the first one
    # with the 'title' method and join them together.
    return components[0] + ''.join(x.title() for x in components[1:])

def generateDataType(data_type) :
    data_types = [
        {
            "type" : "float",
            "convert_to" : "number"
        },
        {
            "type" : "timestamp",
            "convert_to" : "Date"
        },
        {
            "type" : "varchar2",
            "convert_to" : "string"
        }
    ]

    for type in data_types: 
        if(type["type"] == data_type.lower()):
            return type["convert_to"]

    return data_type

def generateNullable(nullable):
    if(nullable == "Y") :
        return "true"
    else:
        return "false"

with open('15.ระบบปฏิบัติงานพิเศษ-Table 1.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    
    schema = []
    list_field_name_camel = []
    for row in csv_reader:
        if(row[0].startswith('PC_')) :
            header_table = row[0].split(' ')[0]
            
            split_header = header_table.split('_')
            class_name = ''.join([split_text.capitalize() for split_text in split_header])

            file_name = header_table.lower()

        elif(row[0] == "ลำดับ") :
            continue
        elif(row[0] != "") :
            field_name = row[1]
            primary = row[2]
            data_type = row[3]
            data_type_size = row[4]
            nullable = row[5]
            comment = row[6]

            schema_row = {
                "field_name" : field_name,
                "field_name_camel" : to_camel_case(field_name.lower()),
                "primary" : primary,
                "data_type" : data_type,
                "data_type_convert" : generateDataType(data_type),
                "data_type_size" : data_type_size,
                "nullable" : generateNullable(nullable),
                "comment" : comment
            }

            list_field_name_camel.append(schema_row["field_name_camel"])

            schema.append(schema_row)

        if(row[0] == "") :
            # cut file

            table = {
                "file_name" : file_name,
                "entity_name" : header_table,
                "class_name" : class_name,
                "schema" : schema
            }

            text = """import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";\r\n"""
            text += """@Entity({{ name: '{}'}})\r\n""".format(table["entity_name"])
            text += """export class Oracle{} {{\r\n""".format(table["class_name"])
            for _schema in table["schema"]:
                if(_schema["primary"] == "PK"):
                    text += """    @PrimaryGeneratedColumn({{ name: '{}', comment: '{}' }}) {} : {}; \r\n""".format(
                        _schema["field_name"], 
                        _schema["comment"], 
                        _schema["field_name_camel"], 
                        _schema["data_type_convert"].lower()
                    )
                else:
                    text += """    @Column({{ name: '{}', nullable: {}, comment: '{}' }}) {} : {}; \r\n""".format(
                        _schema["field_name"], 
                        _schema["nullable"], 
                        _schema["comment"], 
                        _schema["field_name_camel"], 
                        _schema["data_type_convert"].lower()
                    )
            text += """\r\n"""
            text += """    toResponseObject() {\r\n"""
            text += """        const {{ {} }} = this;\r\n""".format(', '.join(list_field_name_camel))
            text += """        const responseObject = {{ {} }};\r\n""".format(', '.join(list_field_name_camel))
            text += """    return responseObject;\r\n"""
            text += """    }\r\n"""
            text += """}"""
            
            f = open(table["file_name"]+".entities.ts", "w")

            table = []
            schema_row = {}
            schema = []
            field_name = ''
            primary = ''
            data_type = ''
            data_type_size = ''
            nullable = ''
            comment = ''
            list_field_name_camel = []

            f.write(text)
            f.close()

            text = ''



