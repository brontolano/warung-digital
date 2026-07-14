# Contributing to WarungDigital

Terima kasih atas minat Anda untuk berkontribusi pada WarungDigital! Dokumen ini akan memandu Anda melalui proses berkontribusi.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- Docker & Docker Compose
- Git
- IDE dengan TypeScript support (VS Code recommended)

### Quick Start

```bash
# Clone repository
git clone https://github.com/brontolano/warung-digital.git
cd warung-digital

# Backend setup
cd tier2-pro/backend
cp .env.example .env
# Edit .env dengan konfigurasi database, JWT_SECRET, dll
npm install --legacy-peer-deps
docker-compose up -d postgres
npm run migration:run
npm run seed
npm run start:dev

# Frontend (terminal baru)
cd ../frontend
npm install --legacy-peer-deps
npm run dev
```

## 🏗 Project Structure

```
warung-digital/
├── tier1-lite/           # Google Apps Script (Free Tier)
│   ├── gas/              # 8 .gs files
│   └── html/             # 7 HTML pages
└── tier2-pro/            # Production stack
    ├── backend/          # NestJS API
    │   ├── src/
    │   │   ├── auth/     # Authentication + JWT
    │   │   ├── products/ # Products + tier pricing
    │   │   ├── pos/      # Point of Sale
    │   │   ├── cashdrawer/ # Shift management
│   │   ├── ar-ap/      # Accounts Receivable/Payable
│   │   ├── stock/      # Stock opname
│   │   ├── marketing/  # Loyalty, commissions
│   │   ├── attendance/ # Check-in/out
│   │   ├── storefront/ # Customer PWA
│   │   ├── reports/    # Profit/loss, top products
│   │   ├── webhooks/   # n8n + WAHA integration
│   │   └── common/     # Shared utilities
│   ├── frontend/       # React + Vite + PWA
│   │   ├── src/
│   │   │   ├── pages/admin/    # 10 admin pages
│   │   │   ├── pages/storefront/ # 5 storefront pages
│   │   │   ├── components/     # Reusable UI
│   │   │   ├── contexts/       # React contexts
│   │   │   └── api/            # API layer
│   └── .env.example
```

## 🛠 Development Guidelines

### Code Style

- **TypeScript strict mode**: Enabled in both frontend & backend
- **ESLint + Prettier**: Configured in both projects
- **Naming conventions**:
  - Files: `kebab-case` (e.g., `cashdrawer.service.ts`)
  - Classes/Interfaces: `PascalCase`
  - Functions/Variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`

### Git Workflow

```bash
# 1. Fork & clone
git clone https://github.com/brontolano/warung-digital.git

# 2. Create feature branch
git checkout -b feature/nama-fitur

# 3. Commit dengan conventional commits
git commit -m "feat: tambah fitur tiering harga"

# 3. Push & create PR
git push origin feature/nama-fitur
```

### Commit Message Format

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore, build, ci

Examples:
feat(pos): tambah fitur scan barcode
fix(auth): perbaiki token refresh
docs(readme): tambahkan setup production deployment guide
```

### Pull Request Checklist

- [ ] Code compiles: `npm run build` (frontend) / `npx tsc --noEmit` (backend)
- [ ] Tests pass: `npm test`
- [ ] Lint clean: `npm run lint`
- [ ] Self-reviewed changes
- [ ] Updated documentation if needed
- [ ] Added tests for new features

## 📝 Code Conventions

### Backend (NestJS)

```typescript
// Controller
@Controller({ path: 'products', version: '1' })
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List products' })
  async findAll(@Query('store_id') storeId: string) {
    return this.service.findAll(storeId);
  }
}

// Service
@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async findAll(store_id: string) {
    return this.repo.find({ where: { store_id, is_active: true } });
  }
}
```

### Frontend (React)

```tsx
// Component structure
interface Props {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: Props) {
  const { user } = useAuth();
  
  return (
    <div className="card">
      <h2>{title}</h2>
      <button className="btn-primary" onClick={onAction}>Action</button>
    </div>
  );
}

// Custom hook
export function useProducts(storeId: string) {
  return useQuery(['products', storeId], () => api.get('/products', { params: { store_id } }));
}
```

## 🧪 Testing

```bash
# Frontend
cd tier2-pro/frontend
npm test              # unit tests
npm run test:e2e      # Cypress E2E

# Backend
cd tier2-pro/backend
npm test              # unit tests
npm run test:e2e      # integration tests
```

## 🔒 Security

- Semua endpoint dilindungi JWT (kecuali public endpoints)
- Password: bcrypt 12 rounds
- Rate limiting: 100 req/min via ThrottlerGuard
- CSP headers via Helmet
- Input validation via class-validator
- Global exception filter untuk sanitasi error

## 🐳 Docker Development

```bash
cd tier2-pro

# Development
docker-compose up -d postgres redis
npm run start:dev

# Production build
docker-compose build
docker-compose up -d

# Logs
docker-compose logs -f backend
```

## 📚 Documentation

- `README.md` - Project overview & quick start
- `docs/BRD_Warung.md` - Business Requirements
- `docs/MRD_Warung.md` - Market Requirements  
- `docs/SRD_Warung.md` - Software Requirements
- `docs/TSD_Warung.md` - Technical Specification
- `SECURITY.md` - Security audit findings

## 📦 Release Process

1. Update version di `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. GitHub Actions akan build & deploy

## 🤝 Code of Conduct

- Be respectful & inclusive
- Focus on constructive feedback
- No harassment or discrimination
- Report issues via GitHub Issues

## 📞 Support

- GitHub Issues: Bug reports & feature requests
- Discussions: Technical questions
- Email: support@warungdigital.id

---

**Thank you for contributing to WarungDigital!** 🏪✨

*WarungDigital — Platform keuangan & stok warung Indonesia*
*Den Ana Brontolano Retail*