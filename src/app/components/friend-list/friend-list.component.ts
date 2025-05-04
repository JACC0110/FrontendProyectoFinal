import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { SocketService } from '../../services/socket.service';
import { Friend } from '../../interfaces/friend';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent {
  displayedColumns: string[] = ['id', 'name', 'gender', 'oldName', 'newName', 'tableName'];
  dataSource: Friend[] = [];

  constructor(private socketService: SocketService) {
    this.socketService.onInitialData().subscribe((data) => {
      this.dataSource = data;
    });

    this.socketService.onFriendUpdate().subscribe((data) => {
      const { id, oldName, newName, gender, tableName } = data;
      const friend = this.dataSource.find(f => f.id === id);

      if (friend) {
        friend.oldName = oldName;
        friend.name = newName || friend.name;
        friend.newName = newName;
      } else {
        this.dataSource.push({
          id,
          name: newName || '',
          gender,
          oldName,
          newName,
          tableName
        });
      }

      this.dataSource = [...this.dataSource];
    });
  }
}
