import React from "react";
import { Table } from "react-bootstrap";
function GodownList() {
  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th></th>
            <th>Godown</th>
            <th>Company</th>
            <th>Email</th>
            <th>ContactPerson</th>
            <th>Phone</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default GodownList;
