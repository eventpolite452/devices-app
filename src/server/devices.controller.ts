import { Controller, Get, Query, Post, Body, Param, Put } from '@nestjs/common';
import { DeviceDto } from './device.dto';
import { DevicesService } from './devices.service';
import { devices as Device } from '@prisma/client';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async getAllDevices(): Promise<string> {
    return await this.devicesService.getDevices();
  }

  @Get('/search')
  async getDevices(
    @Query()
    query: {
      type: 'ID' | 'Brand';
      search: string;
    },
  ): Promise<string> {
    return await this.devicesService.searchDevices(
      query.type.toLowerCase() as 'id' | 'brand',
      query.search,
    );
  }

  @Post()
  async addDevice(@Body() deviceDto: DeviceDto): Promise<void> {
    await this.devicesService.addDevice(deviceDto);
  }

  @Get(':id')
  async getDeviceById(@Param('id') id: string): Promise<Device | null> {
    return this.devicesService.getDeviceById(id);
  }

  @Put(':id')
  async updateDeviceById(
    @Param('id') id: string,
    @Body() updateDeviceDto: DeviceDto,
  ): Promise<Device> {
    return this.devicesService.updateDeviceById(id, updateDeviceDto);
  }
}
