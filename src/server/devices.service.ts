import { Injectable } from '@nestjs/common';
import { DeviceDto } from './device.dto';
import { PrismaService } from './prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { devices as Device } from '@prisma/client';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  async getDevices(): Promise<string> {
    const devices = await this.prisma.devices.findMany({
      orderBy: {
        os: 'asc',
      },
    });
    const count = await this.prisma.devices.count();
    return JSON.stringify({
      devices,
      count,
    });
  }

  async searchDevices(type: 'id' | 'brand', query: string): Promise<string> {
    const devices = await this.prisma.devices.findMany({
      where: {
        [type]: {
          contains: query,
        },
      },
      orderBy: {
        os: 'asc',
      },
    });
    const count = devices.length;
    return JSON.stringify({
      devices,
      count,
    });
  }

  async addDevice(deviceDto: DeviceDto): Promise<void> {
    const id = uuidv4();
    await this.prisma.devices.create({
      data: {
        id,
        model: deviceDto.model,
        brand: deviceDto.brand,
        os: deviceDto.os,
      },
    });
  }

  async getDeviceById(id: string): Promise<Device | null> {
    return this.prisma.devices.findUnique({ where: { id } });
  }

  async updateDeviceById(
    id: string,
    updateDeviceDto: DeviceDto,
  ): Promise<Device> {
    const { model, brand, os } = updateDeviceDto;
    return this.prisma.devices.update({
      where: { id },
      data: { model, brand, os },
    });
  }
}
